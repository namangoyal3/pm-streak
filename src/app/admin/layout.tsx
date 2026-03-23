import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isAdminEmail(email: string): boolean {
  return email === (process.env.ADMIN_EMAIL || "namangoyal21197@gmail.com");
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  if (!user || !isAdminEmail(user.email)) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
