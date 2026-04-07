import { PrismaClient } from "@prisma/client";
import { sendMarketing70OffEmail } from "../src/lib/email";

const prisma = new PrismaClient();

async function main() {
  const email = "namangoyal21197@gmail.com";
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error(`User ${email} not found in database.`);
    return;
  }

  console.log(`Sending test email to ${email} (User ID: ${user.id})...`);
  const success = await sendMarketing70OffEmail({
    userId: user.id,
    toEmail: user.email,
    toName: user.name || "Naman",
  });

  if (success) {
    console.log("Test email sent successully!");
  } else {
    console.error("Failed to send test email.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
