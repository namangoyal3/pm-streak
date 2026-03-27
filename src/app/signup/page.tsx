import { redirect } from "next/navigation";

/** Signup is folded into the home CTA; keep URL for old links. */
export default function SignupPage() {
  redirect("/");
}
