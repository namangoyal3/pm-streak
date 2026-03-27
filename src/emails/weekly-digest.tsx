import * as React from "react";
import { Text } from "@react-email/components";
import { EmailLayout, PrimaryButton, StatRow, CalloutBox, Divider } from "./layout";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";

interface WeeklyDigestEmailProps {
  firstName: string;
  streakCount: number;
  xp: number;
  lessonsThisWeek: number;
  plan: "free" | "pro";
  creditsLeft: number;
  leaderboardRank?: number;
  topFriend?: { name: string; lessonsCompleted: number };
  unusedFeature?: "interview_prep" | "ai_lessons" | "jobs";
  unsubscribeUrl: string;
}

export function WeeklyDigestEmail({
  firstName,
  streakCount,
  xp,
  lessonsThisWeek,
  plan,
  creditsLeft,
  leaderboardRank,
  topFriend,
  unusedFeature,
  unsubscribeUrl,
}: WeeklyDigestEmailProps) {
  const isPro = plan === "pro";
  const weekDate = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  const unusedFeatureBlurbs: Record<string, string> = {
    interview_prep: `You haven't tried Interview Prep yet — it generates 5 tailored PM questions with frameworks based on your level. Costs 5 credits. Try it this week.`,
    ai_lessons: `You haven't generated an AI lesson yet. Pick any topic — "How do I run a pricing experiment?" — and get a full lesson in 30 seconds. Costs 2 credits.`,
    jobs: `The PM jobs board has 40+ roles this week — founding PM, AI PM, senior PM. Worth a 2-minute scroll.`,
  };

  return (
    <EmailLayout
      preview={`${lessonsThisWeek} lessons this week. ${streakCount}-day streak. Here's where you stand.`}
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={h1}>
        {firstName}&apos;s week: {weekDate} 📊
      </Text>

      <StatRow
        items={[
          { value: String(streakCount), label: "Day Streak", color: "#ea580c" },
          { value: String(xp), label: "Total XP", color: "#d97706" },
          { value: String(lessonsThisWeek), label: "This Week", color: "#58cc02" },
        ]}
      />

      {leaderboardRank && (
        <Text style={rankText}>
          🏆 You&apos;re ranked <strong>#{leaderboardRank}</strong> on the leaderboard this week.
          {leaderboardRank <= 10 ? " Top 10 — keep going." : " Keep learning to climb."}
        </Text>
      )}

      {topFriend && (
        <Text style={friendText}>
          🤼 <strong>{topFriend.name}</strong> did {topFriend.lessonsCompleted} lessons this week.{" "}
          {topFriend.lessonsCompleted > lessonsThisWeek
            ? `They're ahead of you. Challenge them.`
            : `You beat them. Don't let them catch up.`}
        </Text>
      )}

      <Divider />

      {isPro && unusedFeature && (
        <CalloutBox bg="#faf5ff" border="#e9d5ff">
          <Text style={{ fontSize: 14, color: "#6b7280", margin: "0 0 4px", fontWeight: 700 }}>
            💡 Pro feature you haven&apos;t used yet:
          </Text>
          <Text style={{ fontSize: 14, color: "#374151", margin: 0, lineHeight: "1.6" }}>
            {unusedFeatureBlurbs[unusedFeature]}
          </Text>
        </CalloutBox>
      )}

      {!isPro && (
        <CalloutBox bg="#fff7ed" border="#fed7aa">
          <Text style={{ fontSize: 14, color: "#92400e", margin: "0 0 6px", lineHeight: "1.5" }}>
            <strong>You have {creditsLeft} credits left this month.</strong>
            <br />
            Pro users get 50 credits, unlimited interview prep, and AI lessons on any topic.
            {creditsLeft < 5
              ? " You're running low. Upgrade before they run out."
              : " Use them — or upgrade for 5x more every month."}
          </Text>
        </CalloutBox>
      )}

      {lessonsThisWeek >= 5 ? (
        <Text style={body}>
          <strong>5+ lessons in a week</strong> puts you in the top 8% of active learners. The
          compounding is real — every lesson makes the next one easier to absorb.
        </Text>
      ) : lessonsThisWeek === 0 ? (
        <Text style={body}>
          No lessons this week. Happens to everyone. Next week&apos;s lesson 1 is waiting — it
          takes less time than reading this email.
        </Text>
      ) : (
        <Text style={body}>
          {lessonsThisWeek} lessons down. The habit is forming. Consistency beats intensity
          every time.
        </Text>
      )}

      <PrimaryButton text="Start this week's lesson →" href={`${APP_URL}/dashboard`} />
    </EmailLayout>
  );
}

export const subject = (firstName: string, streak: number, lessonsThisWeek: number) => {
  if (lessonsThisWeek === 0) return `${firstName}, your PM learning streak is at risk this week`;
  if (streak >= 14) return `${streak} days 🔥 ${firstName}'s weekly PM recap`;
  return `Your PM week: ${lessonsThisWeek} lessons, ${streak}-day streak`;
};

const h1: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 900,
  color: "#111",
  letterSpacing: "-0.5px",
  margin: "0 0 20px",
};

const rankText: React.CSSProperties = {
  fontSize: 14,
  color: "#374151",
  lineHeight: "1.6",
  margin: "0 0 10px",
};

const friendText: React.CSSProperties = {
  fontSize: 14,
  color: "#374151",
  lineHeight: "1.6",
  margin: "0 0 10px",
};

const body: React.CSSProperties = {
  fontSize: 15,
  color: "#374151",
  lineHeight: "1.7",
  margin: "0 0 18px",
};
