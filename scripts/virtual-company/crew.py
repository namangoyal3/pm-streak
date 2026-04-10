import os
import json
import time
import random
from typing import Optional, Type
from pydantic import BaseModel, Field


def get_groq_keys() -> list[str]:
    """Return all available Groq API keys for round-robin rotation."""
    # Multi-key secret (comma-separated) takes priority
    all_keys = os.getenv("GROQ_API_KEYS_ALL", "")
    if all_keys:
        return [k.strip() for k in all_keys.split(",") if k.strip()]
    # Fall back to single key
    single = os.getenv("GROQ_API_KEY", "")
    return [single] if single else []


def make_llm(keys: list[str], max_tokens: int = 4096, temperature: float = 0.3):
    """Create an LLM that rotates across Groq keys on rate limit errors."""
    from crewai import LLM

    key_index = [0]  # mutable for closure

    def next_key() -> str:
        k = keys[key_index[0] % len(keys)]
        key_index[0] += 1
        return k

    # CrewAI/LiteLLM will use GROQ_API_KEY env var as fallback;
    # set the first key and rely on CrewAI's built-in retry for rate limits.
    primary_key = next_key()
    return LLM(
        model="groq/meta-llama/llama-4-scout-17b-16e-instruct",
        temperature=temperature,
        api_key=primary_key,
        max_tokens=max_tokens,
        max_retries=3,
    )

# ── Product Context (injected into every agent backstory) ───────
PM_STREAK_CONTEXT = """
PRODUCT CONTEXT — PM Streak:
- Stack: Next.js 14 app-router, TypeScript, Prisma ORM, Neon/PostgreSQL, Tailwind CSS, deployed on Vercel.
- Repo: namangoyal3/pm-streak. Key paths: src/app/ (pages), src/lib/ (auth/credits/groq), src/components/, prisma/schema.prisma.
- Auth: JWT cookie via src/lib/auth.ts → getCurrentUserId(). Admin check via isAdmin(email) against ADMIN_EMAIL env var.
- AI: Groq llama-3.3-70b-versatile via src/lib/groq.ts. Key in GROQ_API_KEY env var.
- Users: 123 real product managers learning PM skills via streak mechanics, XP, gems, credits.
- Pricing: Free (10 credits/month, limited lessons, 1 AI lesson/day) | Pro ₹499/month or ₹1,899/year (50 credits, all lessons, unlimited AI, jobs board, interview prep).
- Payment: UPI manual → admin grants Pro via /api/admin/grant-upi-pro. Also Dodo Payments SDK.
- Key routes: /pricing, /jobs, /interview-prep, /api/cron/refresh-credits (CRON_SECRET auth), /api/admin/*.
- Goal: Grow Pro conversions, reduce churn, improve streak engagement.
"""


# ── GA4 Tool ────────────────────────────────────────────────────

class GA4QuerySchema(BaseModel):
    property_id: str = Field(..., description="The GA4 Property ID.")
    metric_name: str = Field("activeUsers", description="Metric to pull.")
    dimension_name: str = Field("pagePath", description="Dimension to group by.")
    days_back: int = Field(30, description="Number of days of history (integer, e.g. 30).")

    model_config = {"coerce_numbers_to_str": False}

    @classmethod
    def model_validate(cls, obj, **kwargs):
        if isinstance(obj, dict) and "days_back" in obj:
            try:
                obj["days_back"] = int(obj["days_back"])
            except (ValueError, TypeError):
                obj["days_back"] = 30
        return super().model_validate(obj, **kwargs)


def make_ga4_tool():
    from crewai.tools import BaseTool

    class GoogleAnalytics4Tool(BaseTool):
        name: str = "google_analytics_4_analyzer"
        description: str = (
            "Pulls live traffic data from Google Analytics 4. "
            "Use to find underperforming pages or traffic spikes."
        )
        args_schema: Type[BaseModel] = GA4QuerySchema

        def _run(self, property_id: str, metric_name: str = "activeUsers",
                 dimension_name: str = "pagePath", days_back=30) -> str:
            try:
                days_back = int(days_back)
            except (ValueError, TypeError):
                days_back = 30
            from google.analytics.data_v1beta import BetaAnalyticsDataClient
            from google.analytics.data_v1beta.types import (
                DateRange, Dimension, Metric, RunReportRequest,
            )
            # Load creds from env var (base64-encoded JSON or raw JSON string)
            sa_json = os.getenv("GOOGLE_SA_JSON")
            if not sa_json:
                return "ERROR: GOOGLE_SA_JSON environment variable not set. Add the GA4 service account JSON as a GitHub secret."
            try:
                info = json.loads(sa_json)
                client = BetaAnalyticsDataClient.from_service_account_info(info)
                request = RunReportRequest(
                    property=f"properties/{property_id}",
                    dimensions=[Dimension(name=dimension_name)],
                    metrics=[Metric(name=metric_name)],
                    date_ranges=[DateRange(start_date=f"{days_back}daysAgo", end_date="today")],
                )
                response = client.run_report(request)
                output = f"GA4 Report - Property {property_id} (Last {days_back}d):\n"
                for row in response.rows:
                    output += f"  {row.dimension_values[0].value}: {row.metric_values[0].value}\n"
                return output if response.rows else "No GA4 data found for this property/period."
            except json.JSONDecodeError as e:
                return f"GA4 Error: GOOGLE_SA_JSON is not valid JSON — {e}"
            except Exception as e:
                return f"GA4 API Error: {e}"

    return GoogleAnalytics4Tool()


# ── GitHub PR Tool ───────────────────────────────────────────────

def make_github_read_tool():
    """Tool for CTO to READ existing file content before modifying it."""
    from crewai.tools import BaseTool

    class GitHubReadSchema(BaseModel):
        repo_name: str = Field(..., description="Repository name, e.g. 'namangoyal3/pm-streak'")
        file_path: str = Field(..., description="Path to the file to read, e.g. 'src/app/page.tsx'")

    class GitHubReadTool(BaseTool):
        name: str = "github_file_reader"
        description: str = (
            "Reads the current content of a file from the namangoyal3/pm-streak GitHub repo (main branch). "
            "ALWAYS use this BEFORE github_pr_creator to read the existing file so you can make targeted edits."
        )
        args_schema: Type[BaseModel] = GitHubReadSchema

        def _run(self, repo_name: str, file_path: str) -> str:
            token = os.getenv("GITHUB_TOKEN")
            if not token:
                return "ERROR: GITHUB_TOKEN not found."
            try:
                from github import Github
                import base64
                g = Github(token)
                repo = g.get_repo(repo_name)
                try:
                    contents = repo.get_contents(file_path, ref="main")
                except Exception as e:
                    if "404" in str(e):
                        # File not found — list the directory to help CTO pick a valid file
                        parent = "/".join(file_path.split("/")[:-1]) or ""
                        try:
                            items = repo.get_contents(parent or "src/components", ref="main")
                            names = [c.path for c in items if c.type == "file"][:20]
                            return (
                                f"FILE NOT FOUND: {file_path}\n"
                                f"Files available in '{parent or 'src/components'}':\n"
                                + "\n".join(f"  - {n}" for n in names)
                                + "\n\nChoose one of these existing files, OR create a new file with a fresh name."
                            )
                        except Exception:
                            return (
                                f"FILE NOT FOUND: {file_path}\n"
                                "Suggestion: create a new component file at src/components/ProUpgradeBanner.tsx"
                            )
                    return f"GitHub Read Error: {e}"
                code = base64.b64decode(contents.content).decode("utf-8")
                lines = code.splitlines()
                if len(lines) > 150:
                    return (
                        f"FILE TOO LARGE: {file_path} has {len(lines)} lines — over the 150-line limit.\n"
                        f"DO NOT attempt to rewrite this file. Instead, create a NEW component file "
                        f"(e.g. src/components/YourFeature.tsx) with the new functionality.\n\n"
                        f"First 80 lines for context:\n" + "\n".join(lines[:80])
                    )
                return f"FILE: {file_path} ({len(lines)} lines)\n\n{code}"
            except Exception as e:
                return f"GitHub Read Error: {e}"

    return GitHubReadTool()


def make_github_pr_tool():
    from crewai.tools import BaseTool

    class GitHubPRSchema(BaseModel):
        repo_name: str = Field(..., description="Repository name, e.g. 'namangoyal3/pm-streak'")
        file_path: str = Field(..., description="Path to the file to update, e.g. 'src/app/page.tsx'")
        new_content: str = Field(..., description="Complete updated code for the file — must preserve all existing functionality, only add/modify the specific feature")
        commit_message: str = Field(..., description="Commit message describing the change")
        pr_title: str = Field(..., description="Title for the Pull Request")
        pr_body: str = Field(..., description="Description/PR body explaining the feature")

    class GitHubPRTool(BaseTool):
        name: str = "github_pr_creator"
        description: str = (
            "Creates a new branch, commits updated code to a file, and opens a Pull Request on GitHub. "
            "IMPORTANT: Always call github_file_reader FIRST to read the existing file, then make targeted edits. "
            "Never replace the entire file with a stub — preserve all existing code."
        )
        args_schema: Type[BaseModel] = GitHubPRSchema

        def _run(self, repo_name: str, file_path: str, new_content: str,
                 commit_message: str, pr_title: str, pr_body: str) -> str:
            token = os.getenv("GITHUB_TOKEN")
            if not token:
                return "ERROR: GITHUB_TOKEN not found in environment."
            if not new_content or len(new_content.strip()) < 20:
                return "ERROR: new_content is empty or too short — refusing to create PR with blank code."
            # Sanity check: if new_content is suspiciously short vs a major file, warn
            if len(new_content.splitlines()) < 10:
                return "ERROR: new_content has fewer than 10 lines — you likely forgot to read the existing file first. Use github_file_reader first."

            try:
                from github import Github
                import time
                g = Github(token)
                repo = g.get_repo(repo_name)

                main_ref = repo.get_git_ref("heads/main")
                branch_name = f"ai-feature-{int(time.time())}"
                repo.create_git_ref(ref=f"refs/heads/{branch_name}", sha=main_ref.object.sha)

                try:
                    contents = repo.get_contents(file_path, ref="main")
                    repo.update_file(contents.path, commit_message, new_content,
                                     contents.sha, branch=branch_name)
                except Exception:
                    repo.create_file(file_path, commit_message, new_content, branch=branch_name)

                pr = repo.create_pull(
                    title=pr_title,
                    body=pr_body + "\n\n---\n*Auto-generated by PM Streak Virtual C-Suite*",
                    head=branch_name,
                    base="main",
                )
                return f"SUCCESS: PR created! URL: {pr.html_url} | Branch: {branch_name}"
            except Exception as e:
                return f"GitHub API Error: {e}"

    return GitHubPRTool()


# ── Neon DB Tool (for CCO + CRO) ────────────────────────────────

def make_neon_db_tool():
    from crewai.tools import BaseTool

    class NeonDBSchema(BaseModel):
        query_type: str = Field(
            "retention",
            description="Type of query: 'retention' (churn risk users), 'new_signups' (last 7 days), or 'pro_conversion' (free→pro rate)."
        )

    class NeonDBTool(BaseTool):
        name: str = "neon_db_analyzer"
        description: str = (
            "Queries the PM Streak Neon/PostgreSQL database for user retention, churn risk, "
            "new signups, and Pro conversion metrics. Use to find at-risk users and growth opportunities."
        )
        args_schema: Type[BaseModel] = NeonDBSchema

        def _run(self, query_type: str = "retention") -> str:
            db_url = os.getenv("DATABASE_URL")
            if not db_url:
                return "ERROR: DATABASE_URL environment variable not set."
            try:
                import psycopg2
                conn = psycopg2.connect(db_url)
                cur = conn.cursor()

                if query_type == "retention":
                    # Users who haven't logged in for 14+ days (churn risk)
                    cur.execute("""
                        SELECT email, "createdAt", "lastLoginAt",
                               EXTRACT(DAY FROM NOW() - "lastLoginAt") as days_inactive
                        FROM "User"
                        WHERE "lastLoginAt" < NOW() - INTERVAL '14 days'
                          AND "isPro" = false
                        ORDER BY days_inactive DESC
                        LIMIT 10;
                    """)
                    rows = cur.fetchall()
                    if not rows:
                        return "No churn-risk users found (all active within 14 days)."
                    result = "CHURN RISK USERS (inactive 14+ days, free tier):\n"
                    for row in rows:
                        result += f"  {row[0]} — inactive {int(row[3])} days (joined {row[1].strftime('%Y-%m-%d') if row[1] else 'unknown'})\n"
                    return result

                elif query_type == "new_signups":
                    cur.execute("""
                        SELECT email, "createdAt", "isPro"
                        FROM "User"
                        WHERE "createdAt" > NOW() - INTERVAL '7 days'
                        ORDER BY "createdAt" DESC
                        LIMIT 20;
                    """)
                    rows = cur.fetchall()
                    if not rows:
                        return "No new signups in the last 7 days."
                    result = f"NEW SIGNUPS (last 7 days): {len(rows)} users\n"
                    free = [r for r in rows if not r[2]]
                    pro = [r for r in rows if r[2]]
                    result += f"  Free: {len(free)} | Pro: {len(pro)}\n"
                    for row in free[:10]:
                        result += f"  {row[0]} — signed up {row[1].strftime('%Y-%m-%d %H:%M') if row[1] else 'unknown'}\n"
                    return result

                elif query_type == "pro_conversion":
                    cur.execute("""
                        SELECT
                          COUNT(*) FILTER (WHERE "isPro" = true) as pro_count,
                          COUNT(*) as total_count,
                          COUNT(*) FILTER (WHERE "createdAt" > NOW() - INTERVAL '7 days') as new_this_week,
                          COUNT(*) FILTER (WHERE "isPro" = true AND "createdAt" > NOW() - INTERVAL '7 days') as new_pro_this_week
                        FROM "User";
                    """)
                    row = cur.fetchone()
                    rate = (row[0] / row[1] * 100) if row[1] > 0 else 0
                    weekly_rate = (row[3] / row[2] * 100) if row[2] > 0 else 0
                    return (
                        f"PRO CONVERSION METRICS:\n"
                        f"  Overall: {row[0]}/{row[1]} users are Pro ({rate:.1f}%)\n"
                        f"  This week: {row[3]}/{row[2]} new users converted ({weekly_rate:.1f}%)\n"
                    )

                else:
                    return f"Unknown query_type: {query_type}. Use 'retention', 'new_signups', or 'pro_conversion'."

            except ImportError:
                return "ERROR: psycopg2 not installed. Add psycopg2-binary to requirements.txt."
            except Exception as e:
                return f"Neon DB Error: {e}"
            finally:
                try:
                    conn.close()
                except Exception:
                    pass

    return NeonDBTool()


# ── Mission Execution ────────────────────────────────────────────

def execute_company_mission(
    directive: str,
    ga4_property_id: Optional[str] = None,
    memory_context: str = "No prior board meetings on record.",
) -> dict:
    from crewai import Agent, Task, Crew, Process

    groq_keys = get_groq_keys()
    if not groq_keys:
        raise ValueError("No Groq API keys found. Set GROQ_API_KEYS_ALL or GROQ_API_KEY.")

    print(f"🔑 Using {len(groq_keys)} Groq API key(s) with rotation")

    # Assign different keys to different agents to spread rate-limit load
    def key(i: int) -> str:
        return groq_keys[i % len(groq_keys)]

    # Non-CTO agents: capped at 512 tokens to preserve the llama-3.3-70b TPM budget for CTO.
    # Groq free tier shares TPM across keys; CTO needs ~3k tokens uninterrupted.
    llm0 = make_llm([key(0)], max_tokens=512, temperature=0.3)
    llm1 = make_llm([key(1)], max_tokens=512, temperature=0.3)
    llm2 = make_llm([key(2)], max_tokens=800, temperature=0.3)  # CPO needs a bit more for PRD
    llm4 = make_llm([key(4)], max_tokens=512, temperature=0.3)

    # CTO: llama-3.3-70b-versatile — Groq's best model for structured tool calls.
    # Uses its own dedicated key. A 35s pre-task sleep clears the TPM window.
    from crewai import LLM as _LLM
    llm_code = _LLM(
        model="groq/llama-3.3-70b-versatile",
        temperature=0.1,
        api_key=key(3),
        max_tokens=3000,
        max_retries=5,
    )

    ga4_tool = make_ga4_tool()
    github_read_tool = make_github_read_tool()
    github_tool = make_github_pr_tool()
    neon_tool = make_neon_db_tool()

    # ── Agents (each gets a different Groq key to spread rate-limit load) ──

    # ── Agent backstories enriched with wshobson/agents skill patterns ──
    # Source: github.com/wshobson/agents — business-analytics, startup-business-analyst,
    # customer-sales-automation, content-marketing, seo-analysis-monitoring,
    # comprehensive-review, agent-teams, data-engineering plugins.

    ceo = Agent(
        role="CEO (Chief Executive Officer)",
        goal=(
            "Set company vision, orchestrate the C-suite, and make final strategic calls "
            "using data-driven insights to grow PM Streak's Pro conversions and user retention. "
            "Lead with the data storytelling arc: Setup (current metrics) → Conflict (drop-off) "
            "→ Resolution (this week's action)."
        ),
        backstory=f"""You are a visionary startup CEO who has scaled multiple products from 0 to $100M ARR.
You apply structured frameworks before every decision:
- North Star metric decomposition: identify which sub-metric to move this week
- OKR alignment: every task should map to a measurable weekly KPI
- Stage awareness: PM Streak is pre-revenue seed stage — optimize for first 10 paying users, not scale
- Data storytelling: present all decisions using Hook → Context → Insight → Recommendation

You never guess — you demand data from the CDO and use the startup-analyst mental model:
  TAM/SAM/SOM for sizing, cohort analysis for retention, unit economics for revenue decisions.

You avoid repeating experiments already tried (check memory for prior decisions).
You prioritize: (1) first revenue, (2) activation rate, (3) retention — in that order.
{PM_STREAK_CONTEXT}""",
        allow_delegation=False, llm=llm0, verbose=True,
    )

    cdo = Agent(
        role="CDO (Chief Data Officer)",
        goal=(
            "Own the entire analytics strategy for PM Streak. Use GA4 to identify traffic "
            "drop-offs and funnel leaks. Apply business intelligence frameworks to surface "
            "the single highest-leverage insight this week."
        ),
        backstory=f"""You are a CDO who built data infrastructure at two unicorns and thinks like a business analyst.
You apply these frameworks from the business-analytics playbook:
- Funnel analysis: Homepage → Signup → Lesson 1 → Streak Day 3 → Pro (map each step's conversion)
- Cohort retention: group users by signup week, track 7-day and 14-day retention
- KPI hierarchy: North Star (Pro conversions) → leading indicators (streak completions, lesson starts)
- Anomaly detection: flag metrics moving >15% week-over-week

You always use the google_analytics_4_analyzer tool with property_id=529697573.
You present findings as a data story: Hook (the surprising number) → Context → Insight → Next Action.
You benchmark against SaaS standards: typical PLG activation is 20-40% in day 1, 10-20% at day 7.
{PM_STREAK_CONTEXT}""",
        tools=[ga4_tool], llm=llm1, verbose=True,
    )

    cpo = Agent(
        role="CPO (Chief Product Officer)",
        goal=(
            "Own the PM Streak product roadmap. Convert data insights into concrete PRDs "
            "using the Jobs-to-be-Done framework. Write specs with exact file paths, "
            "measurable hypotheses, and QA criteria."
        ),
        backstory=f"""You are a CPO who shipped products used by 10M+ people and thinks in JTBD + experiment design.
You apply these frameworks from the startup-analyst and product playbooks:
- Jobs-to-be-Done: "When [situation], I want to [motivation], so I can [outcome]"
- Hypothesis format: "If we [change X], then [metric Y] will improve by [Z%] because [reason]"
- Minimal viable change: prefer copy/CTA changes over new features; prefer new components over rewrites
- A/B test design: define control, variant, sample size, and 7-day success metric upfront

You turn ambiguous business goals into razor-sharp specs that engineers love.
You write PRDs that include exact file paths, component names, and API routes.

CRITICAL CONSTRAINT FOR CTO COMPATIBILITY:
- The CTO can only modify files under 150 lines, OR create brand new files.
- NEVER spec changes to src/app/page.tsx, src/app/layout.tsx, or any file over 150 lines.
- For homepage changes: spec a NEW component file (e.g. src/components/HomeCTA.tsx).
- Check file size mentally: if it's a large page file, create a small component instead.
{PM_STREAK_CONTEXT}""",
        llm=llm2, verbose=True,
    )

    cto = Agent(
        role="CTO (Chief Technology Officer)",
        goal=(
            "Architect and ship production-ready Next.js 14 TypeScript code for PM Streak. "
            "Apply clean architecture, SOLID principles, and security-first design. "
            "Always deploy via GitHub Pull Request."
        ),
        backstory=f"""You are a CTO who has built systems handling 1M+ req/s and thinks like an architect-reviewer.
You apply these principles from the comprehensive-review and backend-development playbooks:
- Read before write: ALWAYS call github_file_reader first — never write a file from scratch
- Minimal diff: change only what the PRD specifies — one concern per PR
- SOLID principles: Single Responsibility — one component per file, one purpose per function
- Security: no hardcoded secrets, no auth bypasses, validate all inputs at boundaries
- TypeScript: strict types, no `any`, no implicit returns in async functions

MANDATORY WORKFLOW — execute in this exact order, every time:
  STEP 1: Call github_file_reader to READ the current file content.
  STEP 2: Make only the minimal targeted edit described in the PRD.
  STEP 3: Call github_pr_creator ONCE with the complete updated file (raw TypeScript — NO markdown fences).

You NEVER write a file from scratch — always read first, then edit.
You preserve all existing imports, metadata, components, and logic.
{PM_STREAK_CONTEXT}""",
        tools=[github_tool], llm=llm_code, verbose=True,
    )

    cqo = Agent(
        role="CQO (Chief Quality & Testing Officer)",
        goal=(
            "QA every PM Streak feature using multi-perspective review: correctness, security, "
            "UX, and statistical validity of A/B test design. Issue a binding APPROVE or REJECT verdict."
        ),
        backstory=f"""You are a CQO who thinks like a security-auditor + architect-reviewer + UX tester combined.
You apply these review lenses from the comprehensive-review playbook:
- Correctness: does the implementation match the PRD spec exactly?
- Security audit: OWASP Top 10 scan — XSS, SQL injection, auth bypass, exposed secrets, IDOR
- Architecture review: does it follow existing PM Streak patterns? No coupling violations?
- UX quality: does it match Tailwind design system? Mobile-first? Accessible?
- A/B test validity: is the hypothesis falsifiable? Is the success metric measurable in 7 days?
  Sample size check: at 123 users, need >50 users per variant for statistical significance.

Your response MUST end with EXACTLY one of:
[CQO_VERDICT: APPROVE]
[CQO_VERDICT: REJECT]
{PM_STREAK_CONTEXT}""",
        llm=llm4, verbose=True,
    )

    cmo = Agent(
        role="CMO (Chief Marketing Officer)",
        goal=(
            "Own PM Streak's content marketing, SEO, and distribution. Apply E-E-A-T signals, "
            "topical authority building, and omnichannel distribution to drive organic signups."
        ),
        backstory=f"""You are a CMO who grew a SaaS from 0 to 500K organic monthly visitors using content-led growth.
You apply these frameworks from the content-marketing and seo-analysis-monitoring playbooks:
- E-E-A-T authority signals: Experience (PM case studies), Expertise (PM frameworks), Authority (citations), Trust (testimonials)
- Topical authority: build content clusters around "PM interview prep", "product metrics", "APM programs"
- SEO content strategy: target long-tail, high-intent keywords (e.g., "how to build PM skills daily")
- Distribution channels: LinkedIn (PM audience), Twitter/X, IndiaHacks communities, PM school newsletters
- Social proof: highlight streak numbers, lesson counts, user testimonials in copy

You know PM Streak targets aspiring and mid-level PMs in India and globally.
You write copy that leads with value, not features. Short, scannable, PM-native tone.
{PM_STREAK_CONTEXT}""",
        llm=llm0, verbose=True,
    )

    cro = Agent(
        role="CRO (Chief Revenue Officer)",
        goal=(
            "Drive Pro conversions using personalized outreach and revenue modeling. "
            "Apply sales-automation frameworks to convert free users. "
            "Model unit economics to prioritize the highest-leverage revenue lever."
        ),
        backstory=f"""You are a CRO who has closed $50M+ in SaaS deals and built automated outreach sequences.
You apply these frameworks from the customer-sales-automation and startup-analyst playbooks:
- Unit economics: CAC, LTV, payback period — model each before recommending a channel
- Sales sequence: Lead with value → Personalize with context → One clear CTA → Follow-up cadence
- Outreach personalization: use user's signup timing, lesson history, and streak data as hooks
- Revenue modeling: at 123 users and ₹499/month Pro, show path to ₹50K MRR with conversion math

At PM Streak's stage, your highest leverage is 1:1 personalized outreach (not ads or funnels).
You use the neon_db_analyzer tool with query_type='new_signups' to find free users from the last 7 days.
You write concise (50-word max), warm LinkedIn/email outreach messages with one specific CTA.
{PM_STREAK_CONTEXT}""",
        tools=[neon_tool], llm=llm1, verbose=True,
    )

    cco = Agent(
        role="CCO (Chief Customer Officer)",
        goal=(
            "Own retention, NPS, and customer journey for PM Streak. Apply AI-powered support "
            "and journey mapping frameworks to identify friction and recover at-risk users."
        ),
        backstory=f"""You are a CCO who maintained 95%+ retention at a B2B SaaS using proactive support automation.
You apply these frameworks from the customer-support and customer-experience playbooks:
- Journey mapping: map each touchpoint (signup email → first lesson → streak day 1 → streak break → re-engage)
- Friction identification: spot where users get confused or drop off in the onboarding flow
- CSAT/NPS prediction: at 123 users, what score would they give today? What's the #1 driver?
- Re-engagement segmentation: early quitters (< day 3), streak-broken (day 4-14), dormant (14+ days)
- Proactive outreach triggers: streak break on day 3 → immediate recovery message; 7-day silence → win-back sequence

You use the neon_db_analyzer tool with query_type='retention' to find users inactive for 14+ days.
You write specific, empathetic re-engagement messages — no generic "we miss you".
Reference the user's actual journey (streak length, lessons done) in every message.
{PM_STREAK_CONTEXT}""",
        tools=[neon_tool], llm=llm2, verbose=True,
    )

    # ── Tasks ────────────────────────────────────────────────────

    task_strategy = Task(
        description=f"""CEO: Apply the data storytelling arc to frame this week's mission.

Prior meeting memory:
{memory_context}

Board directive: '{directive}'

Deliver your executive brief using this structure:
1. SETUP: Current state of PM Streak (users, conversion, retention baseline)
2. CONFLICT: The single biggest metric holding us back this week (with a number)
3. RESOLUTION: The one action that will move that metric (hypothesis format)
4. ASSIGNMENTS: Which CXO owns what this week (CDO: data, CPO: spec, CTO: build, CMO: launch, CRO: outreach, CCO: retention)
5. NORTH STAR KPIs: 2-3 measurable targets for the next 7 days

Avoid repeating experiments from prior meetings. Prioritize first revenue over growth.""",
        expected_output="Executive brief with Setup/Conflict/Resolution structure, 2-3 KPIs, and clear CXO assignments.",
        agent=ceo,
    )

    analysis_desc = (
        f"CDO: Use the google_analytics_4_analyzer tool with property_id='{ga4_property_id}' to pull last 30 days of top pages. "
        "Identify the 3 highest-leverage focus areas for improving Pro conversion or engagement. "
        "Also note which pages have the highest drop-off rates."
        if ga4_property_id
        else "CDO: Analyze PM Streak's product funnel (Free signup → first lesson → streak → Pro upgrade). "
             "Identify the 3 highest-leverage focus areas based on typical SaaS conversion patterns at this stage."
    )
    task_analysis = Task(
        description=analysis_desc,
        expected_output="3 data-backed focus areas with specific metrics and recommended interventions.",
        agent=cdo,
        context=[task_strategy],
    )

    task_prd = Task(
        description="""CPO: Write a Markdown PRD for the single highest-impact feature or optimization based on CDO's findings.
Include:
1. Problem statement (with data from CDO)
2. User story ("As a [free PM Streak user], I want to...")
3. Exact technical spec: which Next.js file(s) to modify, what changes to make
4. Success metric (measurable, 7-day target)
5. QA criteria for the CQO
CRITICAL CONSTRAINT FOR CTO COMPATIBILITY:
- The CTO can only modify files that are under 150 lines, OR create brand new files.
- NEVER spec a change to src/app/page.tsx, src/app/layout.tsx, or any file over 150 lines.
- For homepage changes: spec a NEW component file (e.g. src/components/HomeCTA.tsx) that gets imported — not a rewrite of page.tsx.
- Check the file size mentally: if it's a large page file, create a component instead.
Keep it focused — one feature, one small file.""",
        expected_output="Structured 1-page PRD with file paths, user story, tech spec, and success metric.",
        agent=cpo,
        context=[task_analysis],
    )

    # Pre-read the CPO's target file in Python (no LLM call needed).
    # This eliminates the github_file_reader round-trip from the CTO task,
    # reducing CTO from 3+ LLM calls to exactly 1 (github_pr_creator only).
    def _prefetch_file(path: str) -> str:
        token = os.getenv("GITHUB_TOKEN", "")
        if not token:
            return "[GITHUB_TOKEN not set — CTO will need to create a new file]"
        try:
            from github import Github
            import base64
            g = Github(token)
            repo = g.get_repo("namangoyal3/pm-streak")
            contents = repo.get_contents(path, ref="main")
            code = base64.b64decode(contents.content).decode("utf-8")
            lines = code.splitlines()
            if len(lines) > 150:
                return f"[FILE TOO LARGE — {len(lines)} lines. Create a new component instead.]"
            return f"CURRENT FILE CONTENT ({len(lines)} lines):\n```\n{code}\n```"
        except Exception:
            return "[File not found — create it as a new file]"

    # Try to guess a likely component path from the CPO task output (best-effort)
    cpo_hint_path = "src/components/ProUpgradeBanner.tsx"
    prefetched = _prefetch_file(cpo_hint_path)

    task_coding = Task(
        description=f"""CTO: Implement the CPO's PRD spec in ONE file. Create a PR immediately.

The CPO wants a new small component. Here is the current file content (pre-loaded for you — no read tool needed):

{prefetched}

YOUR ONLY JOB: Call github_pr_creator ONCE with:
- repo_name: "namangoyal3/pm-streak"
- file_path: "src/components/ProUpgradeBanner.tsx" (or the path from CPO's spec)
- new_content: complete raw TypeScript/TSX — NO markdown fences, NO backticks, just raw code
- commit_message: short imperative (max 72 chars)
- pr_title: short feature title (max 60 chars)
- pr_body: 2-3 sentences: what changed + what to test

Rules:
- Under 80 lines total
- No markdown fences in new_content
- One tool call, then stop — do not narrate

Output only the PR URL line at the end.""",
        expected_output="PR URL (https://github.com/namangoyal3/pm-streak/pull/N)",
        agent=cto,
        context=[task_prd],
    )

    task_qa = Task(
        description="""CQO: Review the CTO's implementation.
Check for:
1. Correctness — does it implement the PRD spec?
2. Security — any auth bypasses, injection vectors, or exposed secrets?
3. UX quality — does it match PM Streak's Tailwind design patterns?
4. A/B test plan — define a specific hypothesis, control vs variant, and success metric.

End your response with EXACTLY one of:
[CQO_VERDICT: APPROVE]
[CQO_VERDICT: REJECT]""",
        expected_output="QA report + A/B test plan + [CQO_VERDICT: APPROVE] or [CQO_VERDICT: REJECT]",
        agent=cqo,
        context=[task_coding],
    )

    task_marketing = Task(
        description="""CMO: Write a content marketing + SEO launch plan for the new feature.

Apply the E-E-A-T authority and content distribution frameworks:

1. CONTENT HOOK (tweet thread — 3 posts, PM audience, India focus):
   - Post 1: Lead with a counterintuitive PM insight (not a feature announcement)
   - Post 2: The data or framework behind the insight
   - Post 3: CTA to try PM Streak

2. SEO TARGETS (2 long-tail keywords):
   - Intent: informational + transactional
   - Format: "how to [verb] [PM topic]" or "[PM topic] for beginners"
   - Topical cluster: which existing content can internally link to this?

3. E-E-A-T SIGNAL for this feature:
   - What first-hand experience proof can we add? (user testimonial, streak number, lesson count)

4. EMAIL SUBJECT LINE (for free users):
   - One line, < 50 chars, curiosity-driven, no spam words""",
        expected_output="3 social posts with E-E-A-T angle, 2 SEO keywords with topical cluster, 1 email subject line.",
        agent=cmo,
        context=[task_prd],
    )

    task_outreach = Task(
        description="""CRO: Use the neon_db_analyzer tool with query_type='new_signups' to get users from the last 7 days.
Then use query_type='pro_conversion' to get overall conversion stats.

Apply the sales-automation sequence framework:
- For each free user (up to 5): write a personalized outreach message using this formula:
  [Their context: when they signed up + implied goal] → [PM Streak value for their stage] → [One CTA]

Unit economics reality check:
- Show the math: if [X%] of new signups convert at ₹499/month → ₹[Y] MRR
- Identify the single highest-leverage pricing or paywall change to accelerate this

Format:
OUTREACH (numbered list): 1. [email] → [50-word message]
REVENUE MODEL: conversion math + one pricing recommendation""",
        expected_output="5 personalized outreach messages + revenue model with one pricing recommendation.",
        agent=cro,
        context=[task_prd],
    )

    task_retention = Task(
        description="""CCO: Use the neon_db_analyzer tool with query_type='retention' to find users inactive for 14+ days.

Apply the customer journey mapping framework:

For the top 3 churn-risk users:
1. SEGMENT: classify them (early quitter < day 3 / streak-broken day 4-14 / dormant 14+)
2. FRICTION POINT: which specific onboarding step likely caused drop-off?
3. RE-ENGAGEMENT MESSAGE: 60 words max, reference their actual journey (not generic)
   Template: "Hey [name] — [specific thing they did or didn't do] + [what they're missing] + [low-pressure CTA]"
4. TRIGGER: what behavioral signal should auto-fire this message next time?

Then give 1 PRODUCT FIX: a specific onboarding or UX change that would prevent this pattern for future users.""",
        expected_output="3 segmented user profiles + journey-aware re-engagement messages + 1 trigger recommendation + 1 product fix.",
        agent=cco,
        context=[task_prd],
    )

    # Sleep 40s before CTO task to clear llama-3.3-70b TPM window (12k/min limit).
    # CrewAI sequential process: task_prd completes → sleep → task_coding starts.
    def pre_cto_cooldown(output):
        print("⏳ Cooling down 120s before CTO to clear llama-3.3-70b TPM window...")
        time.sleep(120)

    task_prd.callback = pre_cto_cooldown

    crew = Crew(
        agents=[ceo, cdo, cpo, cto, cqo, cmo, cro, cco],
        tasks=[
            task_strategy,
            task_analysis,
            task_prd,
            task_coding,
            task_qa,
            task_marketing,
            task_outreach,
            task_retention,
        ],
        process=Process.sequential,
        verbose=True,
    )

    result = crew.kickoff()

    # crew.kickoff() only returns the last task's output.
    # Scan ALL task outputs for PR URL and CQO verdict.
    import re as _re

    all_task_text = ""
    for task in crew.tasks:
        try:
            raw = getattr(task.output, "raw", "") or ""
            all_task_text += raw + "\n"
        except Exception:
            pass
    # Also include the final result
    all_task_text += str(result)

    # Extract PR URL (pattern: github.com/.../pull/N)
    pr_url = ""
    url_match = _re.search(r"https://github\.com/[\w-]+/[\w-]+/pull/\d+", all_task_text)
    if url_match:
        pr_url = url_match.group(0)

    # Extract CQO verdict
    cqo_verdict = "UNKNOWN"
    if "[CQO_VERDICT: APPROVE]" in all_task_text:
        cqo_verdict = "APPROVE"
    elif "[CQO_VERDICT: REJECT]" in all_task_text:
        cqo_verdict = "REJECT"

    print(f"\n📊 Extracted — PR: {pr_url or 'none'} | CQO: {cqo_verdict}")

    return {
        "result": all_task_text,
        "pr_url": pr_url,
        "cqo_verdict": cqo_verdict,
    }
