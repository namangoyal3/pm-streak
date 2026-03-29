"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle, Send, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/ds";
import {
  EXPERT_GUARDRAIL_MESSAGE,
  EXPERT_PROFILES,
  type ExpertId,
} from "@/lib/experts";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
};

type AuthUser = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  streakCount: number;
  xp: number;
  gems: number;
  credits?: number;
  plan?: string;
  unreadNotifications?: number;
};

const STARTER_QUESTIONS = [
  "How should an early-stage PM choose a North Star Metric for onboarding?",
  "How would you prioritize roadmap items when growth is flat but retention is improving?",
  "What is a practical AI feature validation plan before scaling engineering investment?",
];

export default function AskExpertsPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [expertId, setExpertId] = useState<ExpertId>("lenny");
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ask me anything on product management, startups, or AI. I will answer using our ingested PM knowledge base.",
    },
  ]);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } finally {
        setLoadingAuth(false);
      }
    }

    loadUser();
  }, [router]);

  const selectedExpert = useMemo(
    () => EXPERT_PROFILES.find((expert) => expert.id === expertId) ?? EXPERT_PROFILES[0],
    [expertId]
  );

  async function sendMessage(question: string) {
    const trimmed = question.trim();
    if (!trimmed || submitting) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/ask-experts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertId,
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMessage =
          typeof data?.error === "string" && data.error.trim().length > 0
            ? data.error
            : EXPERT_GUARDRAIL_MESSAGE;
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: errorMessage, isError: true },
        ]);
        return;
      }

      const answer =
        typeof data?.answer === "string" && data.answer.trim().length > 0
          ? data.answer.trim()
          : EXPERT_GUARDRAIL_MESSAGE;
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: EXPERT_GUARDRAIL_MESSAGE, isError: true },
      ]);
    } finally {
      setSubmitting(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void sendMessage(input);
  }

  if (loadingAuth || !user) {
    return (
      <div className={cn(ds.pageShell, "flex items-center justify-center")}>
        <div className="animate-pulse text-[var(--green-primary)] text-lg font-bold">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={ds.pageShell}>
      <Navbar
        streakCount={user.streakCount}
        xp={user.xp}
        gems={user.gems}
        credits={user.credits}
        avatarUrl={user.avatarUrl}
        name={user.name}
        plan={user.plan}
        unreadNotifications={user.unreadNotifications}
      />

      <main className="max-w-3xl mx-auto px-4 py-5 pb-28 space-y-4">
        <section className={cn(ds.panel, "space-y-3")}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <MessageCircle size={18} className="text-[var(--green-primary)]" />
                <h1 className="text-lg font-black">Ask Experts</h1>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/25 text-blue-200 border border-blue-500/40">
                  AI
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Choose an expert voice and ask about product management, startups, or AI.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {EXPERT_PROFILES.map((expert) => (
              <button
                key={expert.id}
                type="button"
                onClick={() => setExpertId(expert.id)}
                className={cn(
                  "px-3 py-2 rounded-xl border text-left transition-colors",
                  expertId === expert.id
                    ? "border-[var(--green-primary)] bg-[var(--green-primary)]/15"
                    : "border-[var(--border-color)] bg-[var(--surface-1)]"
                )}
              >
                <p className="text-xs font-black">{expert.label}</p>
                <p className="text-[10px] text-[var(--text-secondary)]">{expert.tagline}</p>
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-[var(--border-color)] bg-[var(--surface-1)] px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider font-black text-[var(--text-secondary)]">
              Active expert
            </p>
            <p className="text-sm font-black mt-0.5">{selectedExpert.name}</p>
          </div>
        </section>

        <section className={cn(ds.panel, "space-y-3")}>
          <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-1">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn("w-full flex", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed",
                    message.role === "user"
                      ? "bg-[var(--green-primary)] text-white"
                      : message.isError
                        ? "bg-red-500/15 border border-red-500/40 text-red-200"
                        : "bg-[var(--surface-1)] border border-[var(--border-color)] text-white"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {submitting && (
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Loader2 size={14} className="animate-spin" />
                Thinking...
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="space-y-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about PM, startups, or AI..."
              rows={3}
              className="w-full rounded-xl border-2 border-[var(--border-color)] bg-[var(--surface-1)] p-3 text-sm text-white placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--green-primary)]"
              disabled={submitting}
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {STARTER_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => setInput(question)}
                    className="px-2.5 py-1 rounded-full border border-[var(--border-color)] bg-[var(--surface-1)] text-[10px] text-[var(--text-secondary)] hover:text-white"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Sparkles size={10} />
                      Prompt
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="submit"
                disabled={submitting || input.trim().length < 3}
                className={cn(
                  ds.btnPrimary,
                  "px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50"
                )}
              >
                {submitting ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                Send
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
