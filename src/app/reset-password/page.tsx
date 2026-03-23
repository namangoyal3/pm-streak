"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";

  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setValid(false);
      setChecking(false);
      return;
    }
    fetch(`/api/auth/password-reset/verify?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((d) => setValid(Boolean(d.valid)))
      .catch(() => setValid(false))
      .finally(() => setChecking(false));
  }, [token]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/password-reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/login"), 1200);
    } catch {
      setError("Failed to reset password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
        <h1 className="text-xl font-black mb-2">Reset password</h1>

        {checking ? (
          <p className="text-sm text-[var(--text-secondary)]">Checking reset link...</p>
        ) : !valid ? (
          <p className="text-sm text-[var(--red-primary)]">
            This reset link is invalid or expired.
          </p>
        ) : done ? (
          <p className="text-sm text-[var(--green-primary)]">
            Password reset successful. Redirecting to login...
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password (min 8 characters)"
              required
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-3 text-sm text-white placeholder:text-[var(--text-secondary)] focus:border-[var(--green-primary)] focus:outline-none"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-3 text-sm text-white placeholder:text-[var(--text-secondary)] focus:border-[var(--green-primary)] focus:outline-none"
            />
            {error && <p className="text-xs text-[var(--red-primary)]">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[var(--green-primary)] px-3 py-3 text-sm font-black text-white transition-colors hover:bg-[var(--green-dark)] disabled:opacity-60"
            >
              {submitting ? "Resetting..." : "Set new password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-sm rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
            <p className="text-sm text-[var(--text-secondary)]">Loading reset flow...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
