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
    days_back: int = Field(30, description="Days of history.")


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
                 dimension_name: str = "pagePath", days_back: int = 30) -> str:
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

def make_github_pr_tool():
    from crewai.tools import BaseTool

    class GitHubPRSchema(BaseModel):
        repo_name: str = Field(..., description="Repository name, e.g. 'namangoyal3/pm-streak'")
        file_path: str = Field(..., description="Path to the file to update, e.g. 'src/app/page.tsx'")
        new_content: str = Field(..., description="Complete updated code for the file")
        commit_message: str = Field(..., description="Commit message describing the change")
        pr_title: str = Field(..., description="Title for the Pull Request")
        pr_body: str = Field(..., description="Description/PR body explaining the feature")

    class GitHubPRTool(BaseTool):
        name: str = "github_pr_creator"
        description: str = (
            "Creates a new branch, commits updated code to a file, and opens a Pull Request on GitHub. "
            "Use this tool when you want to deploy a feature live or push an A/B test. "
            "Only use this for Next.js/TypeScript files — never commit Python or config files."
        )
        args_schema: Type[BaseModel] = GitHubPRSchema

        def _run(self, repo_name: str, file_path: str, new_content: str,
                 commit_message: str, pr_title: str, pr_body: str) -> str:
            token = os.getenv("GITHUB_TOKEN")
            if not token:
                return "ERROR: GITHUB_TOKEN not found in environment."
            if not new_content or len(new_content.strip()) < 20:
                return "ERROR: new_content is empty or too short — refusing to create PR with blank code."

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

    # Each agent gets its own LLM instance with a different key
    llm0 = make_llm([key(0)], max_tokens=4096, temperature=0.3)
    llm1 = make_llm([key(1)], max_tokens=4096, temperature=0.3)
    llm2 = make_llm([key(2)], max_tokens=4096, temperature=0.3)
    llm_code = make_llm([key(3)], max_tokens=8192, temperature=0.1)  # CTO
    llm4 = make_llm([key(4)], max_tokens=4096, temperature=0.3)

    ga4_tool = make_ga4_tool()
    github_tool = make_github_pr_tool()
    neon_tool = make_neon_db_tool()

    # ── Agents (each gets a different Groq key to spread rate-limit load) ──

    ceo = Agent(
        role="CEO (Chief Executive Officer)",
        goal="Set company vision, orchestrate the C-suite, and make final strategic calls using data-driven insights to grow PM Streak's Pro conversions and user retention.",
        backstory=f"""You are a visionary CEO who has scaled multiple startups to $100M ARR.
You never guess — you demand data from the CDO and market intel from the CMO before making any decision.
You avoid repeating experiments that were already tried (check memory for prior decisions).
{PM_STREAK_CONTEXT}""",
        allow_delegation=False, llm=llm0, verbose=True,
    )
    cdo = Agent(
        role="CDO (Chief Data Officer)",
        goal="Own the entire data strategy for PM Streak. Use GA4 to identify traffic drop-offs, funnel leaks, and user behavior patterns that block Pro conversion.",
        backstory=f"""You are a CDO who built the data infrastructure at two unicorns.
You live in dashboards and can spot a conversion anomaly before anyone else in the room.
You always use the google_analytics_4_analyzer tool with property_id=529697573.
{PM_STREAK_CONTEXT}""",
        tools=[ga4_tool], llm=llm1, verbose=True,
    )
    cpo = Agent(
        role="CPO (Chief Product Officer)",
        goal="Own the PM Streak product roadmap. Convert data insights and CEO strategy into concrete PRDs with Next.js implementation specs and measurable success metrics.",
        backstory=f"""You are a CPO who shipped products used by 10M+ people.
You turn ambiguous business goals into razor-sharp specs that engineers love.
You write PRDs that include exact file paths, component names, and API routes for the PM Streak codebase.
{PM_STREAK_CONTEXT}""",
        llm=llm2, verbose=True,
    )
    cto = Agent(
        role="CTO (Chief Technology Officer)",
        goal="Architect and ship production-ready Next.js 14 TypeScript code for PM Streak. Always deploy code using GitHub Pull Requests via the github_pr_creator tool.",
        backstory=f"""You are a CTO who has built systems handling 1M+ requests per second.
You write complete, production-ready Next.js 14 app-router TypeScript code.
You ALWAYS use the github_pr_creator tool to open a PR on 'namangoyal3/pm-streak'.
You write the FULL file content — never truncate or use placeholders.
You follow PM Streak's patterns: async server components, Prisma for DB, JWT auth via src/lib/auth.ts.
{PM_STREAK_CONTEXT}""",
        tools=[github_tool], llm=llm_code, verbose=True,
    )
    cqo = Agent(
        role="CQO (Chief Quality & Testing Officer)",
        goal="QA every PM Streak feature and design A/B tests. Your final verdict MUST end with exactly [CQO_VERDICT: APPROVE] or [CQO_VERDICT: REJECT].",
        backstory=f"""You are obsessed with continuous testing and statistical significance.
You evaluate PRs for correctness, security (no auth bypasses, no SQL injection), and UX quality.
You design A/B tests with clear hypotheses and success criteria (e.g., +X% Pro conversion in 7 days).
Your response MUST end with exactly one of: [CQO_VERDICT: APPROVE] or [CQO_VERDICT: REJECT].
{PM_STREAK_CONTEXT}""",
        llm=llm4, verbose=True,
    )
    cmo = Agent(
        role="CMO (Chief Marketing Officer)",
        goal="Own PM Streak brand, growth, and SEO. Maximize search rankings and create launch campaigns that drive signups and Pro conversions.",
        backstory=f"""You are a CMO who grew a SaaS from 0 to 500K organic monthly visitors.
You think in funnels, keywords, and distribution channels.
You know PM Streak targets aspiring and mid-level product managers in India and globally.
{PM_STREAK_CONTEXT}""",
        llm=llm0, verbose=True,
    )
    cro = Agent(
        role="CRO (Chief Revenue Officer)",
        goal="Drive Pro conversions at PM Streak. Read new signup data and write personalized outreach messages to convert free users to Pro.",
        backstory=f"""You are a CRO who has closed $50M+ in enterprise SaaS deals.
At PM Streak's current stage (123 users, pre-revenue), your highest leverage is personalized 1:1 outreach.
You use the neon_db_analyzer tool with query_type='new_signups' to find free users from the last 7 days.
You write concise (50-word max), warm LinkedIn/email outreach messages that highlight the specific PM Streak feature most relevant to each user's learning journey.
{PM_STREAK_CONTEXT}""",
        tools=[neon_tool], llm=llm1, verbose=True,
    )
    cco = Agent(
        role="CCO (Chief Customer Officer)",
        goal="Own retention and NPS for PM Streak. Identify churn-risk users and write specific re-engagement playbooks to bring them back.",
        backstory=f"""You are a CCO who maintained 95%+ retention at a B2B SaaS.
You obsess over every confused user and turn their pain into actionable retention interventions.
You use the neon_db_analyzer tool with query_type='retention' to find users inactive for 14+ days.
You write specific, empathetic re-engagement messages for each at-risk user cohort.
{PM_STREAK_CONTEXT}""",
        tools=[neon_tool], llm=llm2, verbose=True,
    )

    # ── Tasks ────────────────────────────────────────────────────

    task_strategy = Task(
        description=f"""CEO: You have context from prior board meetings:
{memory_context}

Now evaluate the new board directive: '{directive}'
- Avoid repeating experiments already tried (check memory above)
- Set 2-3 measurable KPIs (e.g., "+5% Pro conversion in 7 days")
- Assign clear ownership to each C-suite member
- Identify the single highest-leverage action this week""",
        expected_output="Executive brief: mission goals, KPIs, department assignments, and the #1 priority action.",
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
Keep it focused — one feature, not five.""",
        expected_output="Structured 1-page PRD with file paths, user story, tech spec, and success metric.",
        agent=cpo,
        context=[task_analysis],
    )

    task_coding = Task(
        description="""CTO: Implement the feature from the CPO's PRD.
Write the COMPLETE, production-ready file content (no placeholders, no truncation).
Follow PM Streak patterns: Next.js 14 app-router, TypeScript, Prisma for DB, JWT auth.
Then use the github_pr_creator tool to create a PR on 'namangoyal3/pm-streak'.
Output the PR URL at the end of your response.""",
        expected_output="PR URL (e.g. https://github.com/namangoyal3/pm-streak/pull/N) plus a summary of what was implemented.",
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
        description="""CMO: Write a launch plan for the new feature.
1. 3 tweet/LinkedIn post drafts (PM audience, India focus)
2. 2 SEO keyword targets (long-tail, high-intent PM searches)
3. 1 email subject line for the announcement to existing free users""",
        expected_output="Social copy (3 posts), 2 SEO keywords, 1 email subject line.",
        agent=cmo,
        context=[task_prd],
    )

    task_outreach = Task(
        description="""CRO: Use the neon_db_analyzer tool with query_type='new_signups' to get users who signed up in the last 7 days.
For each free user (up to 5), write a personalized 50-word outreach message that:
- Addresses them by their apparent interest (PM learning)
- Highlights the most relevant PM Streak Pro feature for their stage
- Includes a clear, low-pressure CTA to upgrade

Format as numbered list: 1. [email] → [message]""",
        expected_output="5 personalized outreach messages (50 words each) ready to send.",
        agent=cro,
        context=[task_prd],
    )

    task_retention = Task(
        description="""CCO: Use the neon_db_analyzer tool with query_type='retention' to find users inactive for 14+ days.
For the top 3 churn-risk users:
1. Identify likely reason for drop-off (early quitter vs streak-broken vs feature confusion)
2. Write a specific re-engagement message (60 words max, warm tone, no generic "we miss you")
3. Recommend one product change that would prevent this pattern

Format: one section per user with their email, inactivity period, diagnosis, and message.""",
        expected_output="Retention report: 3 at-risk user profiles + re-engagement messages + 1 product recommendation.",
        agent=cco,
        context=[task_prd],
    )

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
    result_str = str(result)

    # Extract PR URL and CQO verdict for memory/workflow
    pr_url = ""
    for line in result_str.splitlines():
        if "github.com" in line and "/pull/" in line:
            parts = line.split()
            for part in parts:
                if "github.com" in part and "/pull/" in part:
                    pr_url = part.strip(".,")
                    break
            if pr_url:
                break

    cqo_verdict = "UNKNOWN"
    if "[CQO_VERDICT: APPROVE]" in result_str:
        cqo_verdict = "APPROVE"
    elif "[CQO_VERDICT: REJECT]" in result_str:
        cqo_verdict = "REJECT"

    return {
        "result": result_str,
        "pr_url": pr_url,
        "cqo_verdict": cqo_verdict,
    }
