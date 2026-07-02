import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type FunnelRow = {
  landing_path: string;
  cta_source_path: string;
  signups: number;
  onboarded: number;
  trials: number;
  checkouts: number;
  payments: number;
};

function getString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getLandingKey(metadata: unknown) {
  if (!metadata || typeof metadata !== "object") return "(unknown)";
  const data = metadata as Record<string, unknown>;
  return (
    getString(data.cta_source_path) ??
    getString(data.landing_path) ??
    getString(data.source_path) ??
    "(unknown)"
  );
}

async function main() {
  const days = Number(process.argv.find((arg) => arg.startsWith("--days="))?.split("=")[1] ?? "30");
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - days);

  const events = await prisma.experimentEvent.findMany({
    where: {
      experimentName: "acquisition",
      createdAt: { gte: since },
    },
    orderBy: { createdAt: "asc" },
    select: {
      eventName: true,
      metadata: true,
    },
  });

  const rows = new Map<string, FunnelRow>();

  for (const event of events) {
    const key = getLandingKey(event.metadata);
    const metadata = event.metadata && typeof event.metadata === "object"
      ? event.metadata as Record<string, unknown>
      : {};
    const row = rows.get(key) ?? {
      landing_path: getString(metadata.landing_path) ?? key,
      cta_source_path: getString(metadata.cta_source_path) ?? key,
      signups: 0,
      onboarded: 0,
      trials: 0,
      checkouts: 0,
      payments: 0,
    };

    if (event.eventName === "signup_completed") row.signups += 1;
    if (event.eventName === "onboarding_completed") row.onboarded += 1;
    if (event.eventName === "trial_started") row.trials += 1;
    if (event.eventName === "checkout_initiated") row.checkouts += 1;
    if (event.eventName === "payment_completed") row.payments += 1;

    rows.set(key, row);
  }

  const result = [...rows.values()]
    .sort((a, b) => b.payments - a.payments || b.checkouts - a.checkouts || b.signups - a.signups)
    .slice(0, 50);

  console.log(JSON.stringify({
    since: since.toISOString(),
    days,
    eventCount: events.length,
    topLandingPages: result,
  }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
