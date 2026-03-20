import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.friendChallenge.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.dailyChallenge.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.completedLesson.deleteMany();
  await prisma.userAchievement.deleteMany();
  await prisma.streakDay.deleteMany();
  await prisma.question.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.category.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.user.deleteMany();

  // Create demo users
  const passwordHash = await bcrypt.hash("demo123", 10);
  await prisma.user.create({
    data: {
      email: "demo@pmstreak.com",
      name: "Demo PM",
      passwordHash,
      xp: 0,
      level: 1,
      streakCount: 0,
      gems: 100,
    },
  });

  const botUsers = [
    { name: "Sarah Chen", xp: 450, level: 5, streakCount: 12, longestStreak: 15 },
    { name: "Marcus Johnson", xp: 320, level: 4, streakCount: 8, longestStreak: 14 },
    { name: "Priya Patel", xp: 580, level: 6, streakCount: 21, longestStreak: 21 },
    { name: "Alex Rivera", xp: 210, level: 3, streakCount: 5, longestStreak: 9 },
    { name: "Emma Wright", xp: 390, level: 4, streakCount: 10, longestStreak: 18 },
    { name: "Kai Tanaka", xp: 150, level: 2, streakCount: 3, longestStreak: 7 },
    { name: "Olivia Morgan", xp: 670, level: 7, streakCount: 30, longestStreak: 30 },
    { name: "David Kim", xp: 280, level: 3, streakCount: 6, longestStreak: 11 },
  ];

  for (const bot of botUsers) {
    await prisma.user.create({
      data: {
        email: `${bot.name.toLowerCase().replace(" ", ".")}@pmstreak.com`,
        passwordHash,
        ...bot,
        gems: 50,
      },
    });
  }

  // Auto-follow some bot users for the demo user
  const demoUser = await prisma.user.findUnique({ where: { email: "demo@pmstreak.com" } });
  const botUsersDb = await prisma.user.findMany({
    where: { email: { not: "demo@pmstreak.com" } },
    take: 4,
  });
  if (demoUser) {
    for (const bot of botUsersDb) {
      await prisma.follow.create({
        data: { followerId: demoUser.id, followingId: bot.id },
      });
    }
    // One bot follows demo back
    if (botUsersDb.length > 0) {
      await prisma.follow.create({
        data: { followerId: botUsersDb[0].id, followingId: demoUser.id },
      });
      // Add a pending challenge from a bot
      await prisma.friendChallenge.create({
        data: {
          challengerId: botUsersDb[0].id,
          challengeeId: demoUser.id,
          message: "Let's see who can complete more lessons this week!",
          status: "pending",
        },
      });
    }
  }

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Product Strategy",
        slug: "product-strategy",
        description: "Core frameworks for building winning products",
        icon: "🎯",
        color: "#58cc02",
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Growth & Metrics",
        slug: "growth-metrics",
        description: "Data-driven product growth from top leaders",
        icon: "📈",
        color: "#1cb0f6",
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "User Psychology",
        slug: "user-psychology",
        description: "Understanding what drives user behavior",
        icon: "🧠",
        color: "#ce82ff",
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: "Leadership & Execution",
        slug: "leadership-execution",
        description: "Managing teams and shipping products",
        icon: "🚀",
        color: "#ff9600",
        sortOrder: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: "Duolingo's Growth Playbook",
        slug: "duolingo-growth",
        description: "How Duolingo achieved 4.5x DAU growth — from Lenny's most popular episodes",
        icon: "🦉",
        color: "#ffc800",
        sortOrder: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: "Pricing & Monetization",
        slug: "pricing-monetization",
        description: "How top companies think about pricing",
        icon: "💰",
        color: "#ff4b4b",
        sortOrder: 6,
      },
    }),
  ]);

  const [strategy, growth, psychology, leadership, duolingo, pricing] = categories;

  // ======== PRODUCT STRATEGY LESSONS ========
  await createLesson(strategy.id, {
    dayNumber: 1,
    title: "The Shreyas Doshi Prioritization Framework",
    slug: "shreyas-prioritization",
    description: "How Stripe's PM leader thinks about what to build next",
    difficulty: 1,
    xpReward: 15,
    youtubeId: "YP_QghPLG-8",
    youtubeStart: 222,
    guestName: "Shreyas Doshi",
    episodeTitle: "The art of product management | Shreyas Doshi (Stripe, Twitter, Google, Yahoo)",
    content: `Shreyas Doshi, former PM at Stripe, Twitter, and Google, shared his prioritization framework on Lenny's Podcast. He argues most PMs confuse "urgency" with "importance."

His framework breaks work into four quadrants:
1. HIGH LEVERAGE — Important + not urgent. This is where the best PMs spend their time. Strategic bets, platform investments, and long-term thinking.
2. QUICK WINS — Important + urgent. Do these immediately but don't let them consume all your time.
3. TRAPS — Not important + urgent. These feel productive but aren't. Most meetings, reactive requests, and "fire drills" live here.
4. TIME SINKS — Not important + not urgent. Delete these ruthlessly.

The key insight: Most PMs spend 80% of time in Quadrants 2 and 3, but the best PMs deliberately protect time for Quadrant 1.

Shreyas recommends a "weekly audit" — every Friday, look at where your time went. If less than 30% was on Quadrant 1 work, something needs to change.

He also introduced the concept of "LNO tasks" — Labor tasks (just get them done), Negotiable tasks (good enough is fine), and Overhead tasks (minimize time spent).`,
    questions: [
      {
        questionText: "According to Shreyas Doshi, where do the best PMs spend most of their time?",
        options: [
          "Quick wins that are important and urgent",
          "High leverage work that is important but not urgent",
          "Firefighting urgent issues",
          "Attending meetings and syncs",
        ],
        correctIndex: 1,
        explanation: "Shreyas argues the best PMs deliberately protect time for HIGH LEVERAGE work — important but not urgent strategic bets.",
      },
      {
        questionText: "What does Shreyas call tasks where 'good enough is fine'?",
        options: ["Labor tasks", "Negotiable tasks", "Overhead tasks", "Leverage tasks"],
        correctIndex: 1,
        explanation: "In the LNO framework: Labor tasks need effort, Negotiable tasks just need to be good enough, and Overhead tasks should be minimized.",
      },
      {
        questionText: "What is the 'trap' quadrant in Shreyas's framework?",
        options: [
          "Important and urgent work",
          "Not important and not urgent work",
          "Not important but urgent work",
          "Important but not urgent work",
        ],
        correctIndex: 2,
        explanation: "Traps are things that feel urgent but aren't actually important — reactive requests, unnecessary meetings, and fire drills.",
      },
      {
        questionText: "Shreyas recommends PMs spend at least what percentage of time on Quadrant 1 (high leverage) work?",
        options: ["10%", "20%", "30%", "50%"],
        correctIndex: 2,
        explanation: "Shreyas recommends a weekly audit — if less than 30% of your time was on high leverage work, something needs to change.",
      },
    ],
  });

  await createLesson(strategy.id, {
    dayNumber: 2,
    title: "Julie Zhuo's Product Sense",
    slug: "julie-zhuo-product-sense",
    description: "The former VP of Design at Facebook on building intuition",
    difficulty: 1,
    xpReward: 15,
    youtubeId: "0Z5FCYDeZXs",
    youtubeStart: 0,
    guestName: "Julie Zhuo",
    episodeTitle: "How To Win Friends & Influence Decisions | Lenny & Friends Summit",
    content: `Julie Zhuo, former VP of Design at Facebook, explained on Lenny's Podcast that "product sense" isn't magical intuition — it's a skill built through deliberate practice.

Her framework for developing product sense:

1. STUDY PATTERNS — Analyze 50+ products you use. For each, ask: Why was this design decision made? What's the business model? Who is the target user?

2. PREDICT & VERIFY — Before reading about a product launch, predict what they'll do and why. Then compare your prediction to reality.

3. DECOMPOSE SUCCESS — When a product succeeds, break down exactly which decisions led to success. Was it timing? Distribution? Design? Pricing?

4. BUILD TASTE — Taste comes from exposure. Use products outside your domain. The best PMs use 10x more products than average.

Julie's key insight: "The difference between a good PM and a great PM is the ability to taste quality." She compares it to wine tasting — you develop a palate through deliberate exposure and analysis.

She also emphasizes the "zoom in, zoom out" skill — great PMs can switch between pixel-level details and company-level strategy in the same meeting.`,
    questions: [
      {
        questionText: "According to Julie Zhuo, product sense is:",
        options: [
          "An innate talent you're born with",
          "A skill built through deliberate practice",
          "Only developed by working at large companies",
          "Primarily about technical knowledge",
        ],
        correctIndex: 1,
        explanation: "Julie emphasizes that product sense is a skill, not a talent — built through deliberate analysis of products and predictions.",
      },
      {
        questionText: "What does Julie recommend to build 'taste' as a PM?",
        options: [
          "Read more business books",
          "Use products outside your domain extensively",
          "Focus only on competitors",
          "Attend design conferences",
        ],
        correctIndex: 1,
        explanation: "Julie says taste comes from exposure — the best PMs use 10x more products than average, including outside their domain.",
      },
      {
        questionText: "What is the 'zoom in, zoom out' skill Julie describes?",
        options: [
          "Switching between mobile and desktop design",
          "Alternating between detail work and big-picture strategy",
          "Managing near-term and long-term roadmaps",
          "Switching between user research and data analysis",
        ],
        correctIndex: 1,
        explanation: "Great PMs can switch between pixel-level details and company-level strategy in the same meeting — that's the zoom in/zoom out skill.",
      },
    ],
  });

  await createLesson(strategy.id, {
    dayNumber: 3,
    title: "Brian Chesky's Founder Mode",
    slug: "brian-chesky-founder-mode",
    description: "How Airbnb's CEO rebuilt the company by going deep",
    difficulty: 2,
    xpReward: 20,
    youtubeId: "4ef0juAMqoE",
    youtubeStart: 180,
    guestName: "Brian Chesky",
    episodeTitle: "Brian Chesky's new playbook",
    content: `Brian Chesky, CEO of Airbnb, shared on Lenny's Podcast how he radically restructured Airbnb's product development after the COVID crisis.

THE OLD WAY: Airbnb had a divisional structure with many autonomous teams. Each team optimized locally but nobody owned the holistic experience. Result: 1,800 people and fragmented product.

THE NEW WAY — "FOUNDER MODE":
1. Single shared roadmap — The entire company works from one unified product roadmap reviewed biweekly.
2. Functional over divisional — Instead of many small teams with PMs, designers, and engineers, Chesky created functional groups (all design together, all engineering together).
3. CEO reviews everything — Chesky personally reviews every significant product change. He compares this to Steve Jobs and Jony Ive reviewing every pixel.
4. Fewer things, better — Instead of 100 experiments, Airbnb does 2 major launches per year with Apple-level polish.

The result? Airbnb went from shipping incrementally to shipping two massive releases per year (Summer and Winter), each with 50+ features — all cohesive.

Key insight: "The best product strategy is actually a marketing strategy." Chesky realized that shipping 50 small things nobody notices is worse than shipping 2 big things everyone talks about.`,
    questions: [
      {
        questionText: "What was wrong with Airbnb's OLD product structure according to Chesky?",
        options: [
          "Teams were too small",
          "Autonomous teams optimized locally but fragmented the overall product",
          "There weren't enough PMs",
          "Engineering velocity was too slow",
        ],
        correctIndex: 1,
        explanation: "Chesky found that many autonomous teams each optimized their own metrics but nobody owned the holistic user experience.",
      },
      {
        questionText: "How often does Airbnb ship major launches under 'Founder Mode'?",
        options: ["Monthly", "Quarterly", "Twice a year", "Annually"],
        correctIndex: 2,
        explanation: "Airbnb now ships 2 major releases per year (Summer and Winter), each with 50+ cohesive features.",
      },
      {
        questionText: "What is Chesky's key insight about product strategy?",
        options: [
          "Ship as many experiments as possible",
          "The best product strategy is actually a marketing strategy",
          "Always let teams decide independently",
          "Focus on technical excellence above all",
        ],
        correctIndex: 1,
        explanation: "Chesky realized shipping 50 small unnoticed things is worse than 2 big things everyone talks about — product strategy IS marketing strategy.",
      },
      {
        questionText: "Which structural change did Chesky make?",
        options: [
          "Divisional to functional organization",
          "Functional to divisional organization",
          "Added more autonomous teams",
          "Hired more PMs per team",
        ],
        correctIndex: 0,
        explanation: "Chesky moved from divisional (many small cross-functional teams) to functional (design together, engineering together) organization.",
      },
    ],
  });

  // ======== GROWTH & METRICS LESSONS ========
  await createLesson(growth.id, {
    dayNumber: 4,
    title: "The North Star Metric Framework",
    slug: "north-star-metric",
    description: "How top companies choose the one metric that matters",
    difficulty: 1,
    xpReward: 15,
    youtubeId: "WlRfyEpAKxw",
    youtubeStart: 0,
    guestName: "Casey Winters",
    episodeTitle: "Why most product managers are unprepared for the demands of a real startup",
    content: `Multiple guests on Lenny's Podcast have discussed the North Star Metric — a single metric that captures the core value your product delivers.

THE FRAMEWORK:
A good North Star Metric must:
1. Reflect customer value delivered (not revenue)
2. Be a leading indicator of revenue
3. Be measurable and actionable
4. Be easy for every team to understand

EXAMPLES FROM LENNY'S GUESTS:
- Spotify: Time spent listening
- Airbnb: Nights booked
- Facebook: Daily Active Users
- Slack: Messages sent within a team
- Figma: Weekly active editors

WHY IT WORKS:
When everyone optimizes for the same metric, alignment happens naturally. Teams stop arguing about priorities because the North Star resolves disputes.

THE TRAP TO AVOID:
Don't pick a vanity metric. "Registered users" tells you nothing about value delivery. You want a metric that, when it goes up, guarantees the business is healthier.

Lenny recommends the "input tree" approach — break your North Star into its component inputs. For Airbnb: Nights Booked = (# listings) × (search conversion) × (booking rate) × (avg length of stay). Each team owns one branch.`,
    questions: [
      {
        questionText: "A good North Star Metric should reflect:",
        options: [
          "Monthly recurring revenue",
          "Customer value delivered",
          "Number of features shipped",
          "Team velocity",
        ],
        correctIndex: 1,
        explanation: "A North Star Metric must reflect customer value delivered, not revenue — though it should be a leading indicator of revenue.",
      },
      {
        questionText: "What is Spotify's North Star Metric?",
        options: [
          "Monthly Active Users",
          "Premium subscribers",
          "Time spent listening",
          "Songs played per session",
        ],
        correctIndex: 2,
        explanation: "Spotify uses 'time spent listening' because it directly reflects the value users get from the product.",
      },
      {
        questionText: "What is the 'input tree' approach Lenny recommends?",
        options: [
          "Building a decision tree for features",
          "Breaking the North Star into component inputs each team owns",
          "Creating a hierarchy of secondary metrics",
          "Mapping customer journey touchpoints",
        ],
        correctIndex: 1,
        explanation: "The input tree breaks your North Star into component inputs. For Airbnb: Nights Booked = listings × conversion × booking rate × stay length.",
      },
    ],
  });

  await createLesson(growth.id, {
    dayNumber: 5,
    title: "Elena Verna's Growth Model",
    slug: "elena-verna-growth",
    description: "Product-led, sales-led, or community-led? How to choose.",
    difficulty: 2,
    xpReward: 20,
    youtubeId: "UTmFuSZfJ9U",
    youtubeStart: 0,
    guestName: "Elena Verna",
    episodeTitle: "Why product-led growth is the future | Elena Verna (Amplitude, Miro, Surveymonkey)",
    content: `Elena Verna, growth advisor to companies like Amplitude, Miro, and MongoDB, has appeared multiple times on Lenny's Podcast sharing her growth frameworks.

THE THREE GROWTH ENGINES:
1. PRODUCT-LED GROWTH (PLG) — Users discover value through the product itself. Free tier → aha moment → conversion. Examples: Slack, Figma, Notion.
2. SALES-LED GROWTH (SLG) — Human sales team drives conversion. Works when deal sizes are large or products are complex. Examples: Salesforce, Palantir.
3. COMMUNITY-LED GROWTH (CLG) — Users attract other users through community, content, and word of mouth. Examples: Stack Overflow, dbt.

THE KEY INSIGHT: You don't choose one forever. Most successful companies START with one engine then LAYER others on top.

Elena's framework for choosing your first engine:
- If ACV < $5K → Product-led (self-serve must work)
- If ACV $5K-$50K → Hybrid (PLG + sales assist)
- If ACV > $50K → Sales-led (but add PLG layer later)

CRITICAL MISTAKE: Trying to do all three at once from day one. You need to nail one engine first, then expand.

Elena's "growth loops" concept: The best growth comes from loops, not funnels. A funnel has a start and end. A loop's output feeds back as input — each user brings more users, creating compounding growth.`,
    questions: [
      {
        questionText: "According to Elena Verna, when should you primarily use Product-Led Growth?",
        options: [
          "When ACV > $50K",
          "When ACV < $5K",
          "When you have a large sales team",
          "When the product is very complex",
        ],
        correctIndex: 1,
        explanation: "Elena recommends PLG when ACV < $5K because self-serve must work at that price point — you can't afford human sales.",
      },
      {
        questionText: "What is Elena's 'growth loop' concept?",
        options: [
          "A funnel with a feedback mechanism",
          "A loop where each user's output feeds back as input for more users",
          "A cycle of build-measure-learn",
          "A retention flywheel",
        ],
        correctIndex: 1,
        explanation: "Growth loops compound — the output feeds back as input. Each user brings more users, unlike a funnel which has a start and end.",
      },
      {
        questionText: "What critical mistake does Elena warn against?",
        options: [
          "Choosing PLG too early",
          "Ignoring sales entirely",
          "Trying to do all three growth engines at once from day one",
          "Focusing too much on metrics",
        ],
        correctIndex: 2,
        explanation: "Elena warns against trying PLG + SLG + CLG simultaneously. Nail one engine first, then layer others on top.",
      },
    ],
  });

  await createLesson(growth.id, {
    dayNumber: 6,
    title: "Retention: The Silent Growth Killer",
    slug: "retention-growth-killer",
    description: "Why retention is the #1 metric most teams ignore",
    difficulty: 2,
    xpReward: 20,
    youtubeId: "6XMUDEYf2OE",
    youtubeStart: 0,
    guestName: "Casey Winters",
    episodeTitle: "How to sell your ideas and rise within your company | Casey Winters",
    content: `Across dozens of episodes, Lenny's guests consistently rank retention as the most underappreciated growth metric.

Casey Winters (former growth lead at Pinterest, Grubhub) explained: "If your retention is bad, growth is a leaky bucket. You can pour users in the top, but they'll all leak out."

THE RETENTION BENCHMARKS (from Lenny's research):
- Consumer apps (good): 25% D30 retention
- Consumer apps (great): 45%+ D30 retention
- SaaS products (good): 60% M3 retention
- SaaS products (great): 80%+ M3 retention
- Consumer subscription (good): 55% M12 retention

THE RETENTION CURVE:
Every product has a retention curve that eventually flattens. The question is WHERE it flattens.

If it flattens at 0% — you don't have product-market fit. No amount of growth will save you.
If it flattens at 20%+ for consumer (40%+ for SaaS) — you have a real product. Now optimize.

THE ACTIVATION INSIGHT:
Most retention problems are actually activation problems. If users don't reach the "aha moment" fast enough, they churn.

Lenny's rule: Identify your aha moment → measure % of users who reach it → optimize the path to get there faster.`,
    questions: [
      {
        questionText: "What is considered 'great' D30 retention for consumer apps?",
        options: ["15%", "25%", "35%", "45%+"],
        correctIndex: 3,
        explanation: "According to Lenny's benchmarks, 45%+ D30 retention is considered great for consumer apps.",
      },
      {
        questionText: "According to Casey Winters, what makes growth a 'leaky bucket'?",
        options: [
          "Poor acquisition channels",
          "Bad retention",
          "High CAC",
          "Low brand awareness",
        ],
        correctIndex: 1,
        explanation: "Casey explains that if retention is bad, you can pour users in the top but they'll all leak out — making growth efforts futile.",
      },
      {
        questionText: "Most retention problems are actually problems with:",
        options: [
          "Pricing",
          "Marketing",
          "Activation — users not reaching the 'aha moment'",
          "Feature gaps",
        ],
        correctIndex: 2,
        explanation: "Most retention issues trace back to activation. If users don't experience the core value quickly, they churn before forming a habit.",
      },
    ],
  });

  // ======== USER PSYCHOLOGY LESSONS ========
  await createLesson(psychology.id, {
    dayNumber: 7,
    title: "Nir Eyal's Hook Model",
    slug: "nir-eyal-hook-model",
    description: "The four-step cycle that creates habit-forming products",
    difficulty: 1,
    xpReward: 15,
    youtubeId: "WSscIIY609c",
    youtubeStart: 0,
    guestName: "Nir Eyal",
    episodeTitle: "Strategies for becoming less distractible and improving focus | Nir Eyal",
    content: `Nir Eyal, author of "Hooked," shared his habit-forming product framework on Lenny's Podcast.

THE HOOK MODEL — Four Steps:

1. TRIGGER — External (notification, email) or Internal (emotion, situation). The goal is to graduate users from external to internal triggers. When users feel bored, they open Instagram. That's an internal trigger.

2. ACTION — The simplest behavior in anticipation of a reward. Must require minimal effort. Scrolling, tapping, swiping. BJ Fogg's formula: Behavior = Motivation × Ability × Trigger.

3. VARIABLE REWARD — The key insight. Fixed rewards create habituation (diminishing returns). Variable rewards create fascination. Three types:
   - Rewards of the Tribe: Social validation (likes, comments)
   - Rewards of the Hunt: Search for resources/information (scrolling feeds)
   - Rewards of the Self: Mastery, competence, completion (leveling up)

4. INVESTMENT — Users put something into the product that makes it more valuable over time. Data, content, followers, reputation. This increases switching costs and loads the next trigger.

KEY INSIGHT: The cycle must repeat enough times that the external trigger becomes internal. Typically requires 3-5 cycles through the hook.`,
    questions: [
      {
        questionText: "What makes variable rewards more powerful than fixed rewards?",
        options: [
          "They're more expensive to give",
          "They prevent habituation and create fascination",
          "Users prefer consistency",
          "They're easier to implement",
        ],
        correctIndex: 1,
        explanation: "Fixed rewards create habituation (diminishing returns). Variable rewards create fascination — uncertainty keeps users engaged.",
      },
      {
        questionText: "Which is an example of 'Rewards of the Tribe'?",
        options: [
          "Completing a puzzle",
          "Finding a good deal while shopping",
          "Getting likes and comments on a post",
          "Reaching a new level",
        ],
        correctIndex: 2,
        explanation: "Rewards of the Tribe are social validation — likes, comments, followers. They tap into our need for social belonging.",
      },
      {
        questionText: "Why is the 'Investment' phase important in the Hook Model?",
        options: [
          "It generates direct revenue",
          "It makes the product more valuable to the user over time",
          "It replaces the need for triggers",
          "It reduces development costs",
        ],
        correctIndex: 1,
        explanation: "Investment (data, content, followers) makes the product increasingly valuable, raises switching costs, and loads the next trigger.",
      },
      {
        questionText: "According to Nir Eyal, how many hook cycles does it typically take to form a habit?",
        options: ["1-2", "3-5", "7-10", "21+"],
        correctIndex: 1,
        explanation: "Nir says the hook cycle must repeat 3-5 times for an external trigger to become internal (automatic behavior).",
      },
    ],
  });

  await createLesson(psychology.id, {
    dayNumber: 8,
    title: "The Psychology of Onboarding",
    slug: "psychology-onboarding",
    description: "How to get users to the 'aha moment' before they leave",
    difficulty: 2,
    xpReward: 20,
    youtubeId: "UTmFuSZfJ9U",
    youtubeStart: 1200,
    guestName: "Elena Verna",
    episodeTitle: "Why product-led growth is the future | Elena Verna",
    content: `Multiple Lenny's Podcast guests have shared insights about onboarding psychology:

THE AHA MOMENT:
Every product has a moment where the user first experiences its core value. For:
- Slack: Sending and receiving a message from a teammate
- Dropbox: Saving a file and accessing it from another device
- Tinder: Getting a match

THE RACE AGAINST TIME:
Research shared on the podcast shows you have approximately:
- Web apps: 3-5 minutes before users decide to stay or leave
- Mobile apps: 30-60 seconds
- The best onboarding doesn't explain features — it delivers value

KEY PRINCIPLES:
1. REDUCE TIME-TO-VALUE — Remove every unnecessary step between signup and the aha moment.
2. PROGRESSIVE DISCLOSURE — Don't show everything at once. Reveal features as users need them.
3. ENDOWED PROGRESS EFFECT — Show users they've already made progress. A progress bar starting at 20% converts better than one at 0%.
4. SOCIAL PROOF IN FLOW — "1,847 teams started using Slack today" reduces anxiety about trying something new.
5. COMMITMENT & CONSISTENCY — Get small commitments early. Once users invest time customizing, they're more likely to stay.

COMMON MISTAKE: Asking for information you don't need yet. Every field in a signup form costs you ~5% of users.`,
    questions: [
      {
        questionText: "How much time do you roughly have to hook a user on a mobile app?",
        options: ["3-5 minutes", "30-60 seconds", "10-15 minutes", "5-10 seconds"],
        correctIndex: 1,
        explanation: "Research shows mobile apps get 30-60 seconds before users decide to stay or leave. Web apps get slightly more (3-5 minutes).",
      },
      {
        questionText: "What is the 'Endowed Progress Effect'?",
        options: [
          "Giving users free credits to start",
          "Showing users they've already made progress (e.g., starting progress at 20%)",
          "Rewarding users for completing setup",
          "Making the first task extremely easy",
        ],
        correctIndex: 1,
        explanation: "The Endowed Progress Effect means showing users they've already started. A progress bar at 20% converts better than 0%.",
      },
      {
        questionText: "Each unnecessary field in a signup form costs approximately:",
        options: ["1% of users", "5% of users", "10% of users", "15% of users"],
        correctIndex: 1,
        explanation: "Every additional field in a signup form loses approximately 5% of potential users. Only ask for what you absolutely need.",
      },
    ],
  });

  // ======== LEADERSHIP & EXECUTION LESSONS ========
  await createLesson(leadership.id, {
    dayNumber: 9,
    title: "Lenny's Guide to Writing Great PRDs",
    slug: "writing-great-prds",
    description: "The anatomy of product specs that actually get built well",
    difficulty: 1,
    xpReward: 15,
    youtubeId: "YP_QghPLG-8",
    youtubeStart: 2700,
    guestName: "Shreyas Doshi",
    episodeTitle: "The art of product management | Shreyas Doshi",
    content: `Lenny dedicated an entire episode to the art of writing Product Requirements Documents. His research across dozens of top PMs revealed a clear pattern.

THE GREAT PRD TEMPLATE:
1. PROBLEM STATEMENT (most important) — What problem are we solving? For whom? How do we know it's a real problem? Include data, user quotes, and support tickets.

2. GOALS & SUCCESS METRICS — What does success look like? Define 1-2 primary metrics and guardrail metrics (things that shouldn't get worse).

3. CONTEXT & BACKGROUND — What's been tried before? What do competitors do? What does user research say?

4. SOLUTION OVERVIEW — High-level approach. Not wireframes yet — just the conceptual solution.

5. DETAILED REQUIREMENTS — The "what" not the "how." Describe user stories, edge cases, and acceptance criteria.

6. OUT OF SCOPE — Explicitly state what you're NOT doing. This prevents scope creep.

7. OPEN QUESTIONS — List unresolved decisions. This shows you've thought deeply while being honest about unknowns.

KEY INSIGHT: The #1 mistake PMs make is jumping to the solution too quickly. The best PRDs spend 40% of their word count on the problem statement.

Lenny's "one-pager test": If you can't explain the problem and solution in one page, you don't understand it well enough.`,
    questions: [
      {
        questionText: "According to Lenny, what is the MOST important section of a PRD?",
        options: [
          "Detailed requirements",
          "Solution overview",
          "Problem statement",
          "Goals and metrics",
        ],
        correctIndex: 2,
        explanation: "The problem statement is most important. The best PRDs spend 40% of word count on explaining the problem clearly.",
      },
      {
        questionText: "What is the #1 mistake PMs make when writing PRDs?",
        options: [
          "Making them too long",
          "Jumping to the solution too quickly",
          "Not including wireframes",
          "Skipping the metrics section",
        ],
        correctIndex: 1,
        explanation: "PMs often rush to describe solutions before adequately defining the problem. Great PRDs invest heavily in problem framing.",
      },
      {
        questionText: "Why should a PRD include an 'Out of Scope' section?",
        options: [
          "To reduce document length",
          "To assign blame if features aren't built",
          "To explicitly prevent scope creep",
          "To satisfy legal requirements",
        ],
        correctIndex: 2,
        explanation: "The Out of Scope section explicitly states what you're NOT doing, preventing scope creep during development.",
      },
    ],
  });

  await createLesson(leadership.id, {
    dayNumber: 10,
    title: "Managing Up and Sideways",
    slug: "managing-up-sideways",
    description: "How top PMs influence without authority",
    difficulty: 2,
    xpReward: 20,
    youtubeId: "0Z5FCYDeZXs",
    youtubeStart: 300,
    guestName: "Julie Zhuo",
    episodeTitle: "How To Win Friends & Influence Decisions | Julie Zhuo",
    content: `Several Lenny's Podcast guests have discussed the art of influence without authority — the most critical PM skill.

THE FRAMEWORK FOR INFLUENCE (synthesized from multiple episodes):

1. BUILD CREDIBILITY FIRST — Before you can influence, people need to trust your judgment. How?
   - Ship things that work. Nothing builds credibility like results.
   - Do your homework. Come to meetings with data, not opinions.
   - Give credit generously. "The engineering team crushed this" > "I drove this."

2. UNDERSTAND STAKEHOLDER MOTIVATIONS — Every stakeholder has different goals:
   - Engineering: Technical quality, interesting problems, manageable scope
   - Design: User experience, creativity, craft
   - Sales: Features customers are asking for
   - Executive: Business outcomes, strategy alignment
   Frame your proposals in terms of THEIR goals.

3. THE "DISAGREE AND COMMIT" PRINCIPLE — Amazon's approach shared by multiple guests: Voice disagreement clearly, but once a decision is made, commit fully. This builds trust.

4. WRITE, DON'T JUST TALK — Written proposals are taken more seriously than verbal ones. A well-crafted one-pager is more persuasive than an hour-long meeting.

5. CREATE ALIGNMENT BEFORE THE MEETING — The decision should be 80% made before the big meeting. Do pre-work: 1-on-1s, shared documents, informal chats.

Key insight from Julie Zhuo: "The best PMs never say 'I decided.' They say 'Here's what we're doing and why.' Making it a team decision dramatically reduces resistance."`,
    questions: [
      {
        questionText: "What is the fastest way to build credibility as a PM?",
        options: [
          "Attending all meetings",
          "Writing long strategy docs",
          "Shipping things that work — results build credibility",
          "Getting executive sponsorship",
        ],
        correctIndex: 2,
        explanation: "Nothing builds PM credibility like shipping things that work. Results speak louder than presentations.",
      },
      {
        questionText: "What is the 'Disagree and Commit' principle?",
        options: [
          "Always agreeing with the team",
          "Voice disagreement clearly, but commit fully once decided",
          "Only committing to ideas you agree with",
          "Disagreeing publicly after a decision",
        ],
        correctIndex: 1,
        explanation: "Disagree and Commit means voicing your concerns clearly, but once the team decides, committing 100%. This builds trust.",
      },
      {
        questionText: "According to multiple guests, when should the decision be largely made?",
        options: [
          "During the big meeting",
          "After the meeting, via email",
          "80% decided BEFORE the big meeting through pre-work",
          "In a follow-up sync",
        ],
        correctIndex: 2,
        explanation: "Alignment should be 80% created before the meeting through 1-on-1s, shared docs, and informal chats.",
      },
    ],
  });

  // ======== DUOLINGO'S GROWTH PLAYBOOK ========
  await createLesson(duolingo.id, {
    dayNumber: 11,
    title: "Duolingo's Streak Mechanics Deep Dive",
    slug: "duolingo-streaks",
    description: "How 600+ experiments created the world's stickiest streak system",
    difficulty: 2,
    xpReward: 25,
    youtubeId: "_CCwoQZH5hI",
    youtubeStart: 0,
    guestName: "Jackson Shuttleworth",
    episodeTitle: "Behind the product: Duolingo streaks | Jackson Shuttleworth (Group PM, Retention Team)",
    content: `Jackson Shuttleworth, Duolingo's head of growth, revealed on Lenny's Podcast how streaks became their most powerful retention tool.

THE NUMBERS: Duolingo ran 600+ experiments on streaks alone. Here's what they learned:

1. LOSS AVERSION > GAIN SEEKING — Users are 2-3x more motivated by fear of losing their streak than by gaining rewards. The "You'll lose your 47-day streak!" notification outperforms "Continue your learning journey!" by 3x.

2. STREAK FREEZE — Instead of letting users lose streaks permanently, they introduced streak freezes. This seems counterintuitive (don't you want pressure?), but it actually INCREASED engagement because it reduced "streak despair" — when users lose a long streak and never come back.

3. THE "STREAK SOCIETY" — At day 365, users join a special club. This creates aspiration for everyone below and commitment for everyone in it.

4. STREAK NOTIFICATIONS — They tested every possible notification timing. The winner: personalized timing based on when the user usually practices, sent ~30 minutes before their typical session, with increasing urgency as the day progresses.

5. THE CALENDAR VISUALIZATION — Showing a visual streak calendar (exactly like what we built in PM Streak!) increased motivation more than just showing a number. Users don't want to "break the chain."

KEY INSIGHT: Streaks work because they convert an abstract goal ("learn Spanish") into a concrete daily action ("don't break the chain"). This is behavioral psychology 101 — specific, measurable commitments beat vague aspirations.`,
    questions: [
      {
        questionText: "According to Duolingo's data, loss aversion vs. gain seeking in notifications shows:",
        options: [
          "They perform equally",
          "Gain-framed messages work 2x better",
          "Loss-framed messages work 3x better",
          "Neither works well",
        ],
        correctIndex: 2,
        explanation: "Duolingo found that 'You'll lose your streak!' notifications outperform positive framing by 3x — loss aversion is a powerful motivator.",
      },
      {
        questionText: "Why did introducing streak freezes INCREASE engagement?",
        options: [
          "Users liked free features",
          "It reduced 'streak despair' — users losing long streaks and never returning",
          "It made the app seem more generous",
          "It drove more in-app purchases",
        ],
        correctIndex: 1,
        explanation: "Streak freezes prevent 'streak despair' — when users lose a long streak and feel so discouraged they abandon the app entirely.",
      },
      {
        questionText: "What converts abstract goals into daily action according to Duolingo's research?",
        options: [
          "Gamification points",
          "Social pressure",
          "Streaks — turning vague aspirations into 'don't break the chain'",
          "Leaderboard competition",
        ],
        correctIndex: 2,
        explanation: "Streaks convert abstract goals ('learn Spanish') into concrete daily actions ('don't break the chain') — specific commitments beat vague aspirations.",
      },
      {
        questionText: "How many experiments did Duolingo run on streaks alone?",
        options: ["100+", "300+", "600+", "1000+"],
        correctIndex: 2,
        explanation: "Duolingo ran 600+ experiments just on streak mechanics, showing the depth of investment in their core retention loop.",
      },
    ],
  });

  await createLesson(duolingo.id, {
    dayNumber: 12,
    title: "Duolingo's Leaderboard Revolution",
    slug: "duolingo-leaderboards",
    description: "How competitive ranking drove 4.5x DAU growth",
    difficulty: 2,
    xpReward: 25,
    youtubeId: "_CCwoQZH5hI",
    youtubeStart: 2400,
    guestName: "Jackson Shuttleworth",
    episodeTitle: "Behind the product: Duolingo streaks | Jackson Shuttleworth",
    content: `Jorge Mazal, former CPO of Duolingo, detailed on Lenny's Podcast how leaderboards became their biggest growth lever.

THE 4.5x DAU GROWTH STORY:
Duolingo's Daily Active Users grew 4.5x over ~3 years. The single biggest contributor? Leaderboards.

HOW THEY DESIGNED IT:
1. TIERED LEAGUES — Instead of one massive leaderboard, they created tiers (Bronze → Silver → Gold → Diamond). This keeps everyone competitive with peers at their level.

2. WEEKLY RESETS — Leaderboards reset weekly. This creates urgency and gives everyone a fresh start. It prevents "unbeatable" players from discouraging newcomers.

3. PROMOTION/RELEGATION — Top 10 get promoted to the next league. Bottom 5 get relegated. This creates stakes — you're not just competing, you're fighting to stay.

4. RIGHT-SIZED GROUPS — Each leaderboard has ~30 people. Too few = not competitive. Too many = feels hopeless. 30 is the sweet spot.

5. MATCHMAKING — They match you with users of similar activity levels. A casual user never competes against a power user.

THE PSYCHOLOGY:
- Social comparison drives 40% of incremental sessions
- Fear of relegation is more motivating than hope of promotion
- Users who are in the top 5 practice 2x more in the last 24 hours of a league

KEY METRIC: Leaderboards increased daily active users by 17% with minimal impact on long-term retention — meaning it drove NEW engagement without cannibalizing existing habits.`,
    questions: [
      {
        questionText: "What is the optimal leaderboard group size according to Duolingo?",
        options: ["~10 people", "~30 people", "~100 people", "~500 people"],
        correctIndex: 1,
        explanation: "~30 people is the sweet spot. Too few = not competitive enough. Too many = feels hopeless. 30 creates ideal competition.",
      },
      {
        questionText: "Why do Duolingo's leaderboards reset weekly?",
        options: [
          "To reduce server costs",
          "To prevent unbeatable players from discouraging newcomers",
          "To force users to pay for permanent stats",
          "Weekly is the standard gamification interval",
        ],
        correctIndex: 1,
        explanation: "Weekly resets prevent 'unbeatable' players from discouraging newcomers and create urgency — everyone gets a fresh start.",
      },
      {
        questionText: "What drives more engagement — fear of relegation or hope of promotion?",
        options: [
          "Hope of promotion",
          "They're equal",
          "Fear of relegation",
          "Neither — XP rewards matter more",
        ],
        correctIndex: 2,
        explanation: "Fear of relegation is more motivating than hope of promotion — consistent with loss aversion psychology.",
      },
      {
        questionText: "By how much did leaderboards increase Duolingo's DAU?",
        options: ["5%", "10%", "17%", "25%"],
        correctIndex: 2,
        explanation: "Leaderboards increased DAU by 17% with minimal impact on long-term retention — pure incremental engagement.",
      },
    ],
  });

  // ======== PRICING & MONETIZATION LESSONS ========
  await createLesson(pricing.id, {
    dayNumber: 13,
    title: "The Psychology of Pricing",
    slug: "psychology-pricing",
    description: "How top companies price their products using behavioral science",
    difficulty: 2,
    xpReward: 20,
    youtubeId: "A6veeCbKIzw",
    youtubeStart: 0,
    guestName: "Madhavan Ramanujam",
    episodeTitle: "The art and science of pricing | Madhavan Ramanujam (Monetizing Innovation)",
    content: `Madhavan Ramanujam, author of "Monetizing Innovation," shared pricing psychology insights on Lenny's Podcast.

THE 5 PRICING PRINCIPLES:

1. WILLINGNESS TO PAY BEFORE BUILDING — Most companies build first, then figure out pricing. Top companies ask "How much would you pay for this?" before writing a line of code. This prevents building features nobody values enough to pay for.

2. THE 10x VALUE RULE — Your product should deliver 10x the value of what you charge. If you charge $100/month, users should perceive $1,000/month in value. This makes the purchasing decision easy.

3. ANCHORING — The first price a customer sees becomes the reference point. Show the expensive plan first. A $200/mo plan makes $50/mo feel like a steal. This is why every SaaS pricing page shows Enterprise first.

4. THE DECOY EFFECT — Three pricing tiers work better than two because the middle tier becomes the obvious choice. The "Professional" plan between "Basic" and "Enterprise" captures 60%+ of signups.

5. LOSS FRAMING — "You're losing $500/month in productivity" is more compelling than "You'll gain $500/month." Frame your value in terms of what customers are losing without you.

KEY INSIGHT: "People don't buy products. They buy outcomes. Price the outcome, not the product." — If your tool saves 10 hours/week for someone earning $100/hour, you're selling $4,000/month in time savings.`,
    questions: [
      {
        questionText: "When should you research willingness to pay according to Madhavan?",
        options: [
          "After launch",
          "During beta",
          "Before writing a line of code",
          "When you have 1000+ users",
        ],
        correctIndex: 2,
        explanation: "Top companies research willingness to pay BEFORE building. This prevents creating features nobody values enough to pay for.",
      },
      {
        questionText: "What is the '10x value rule'?",
        options: [
          "Charge 10x your costs",
          "Deliver 10x the perceived value vs. what you charge",
          "Price 10x below competitors",
          "Grow revenue 10x yearly",
        ],
        correctIndex: 1,
        explanation: "Your product should deliver 10x the perceived value of what you charge. If you charge $100/mo, users should see $1,000/mo in value.",
      },
      {
        questionText: "Why do SaaS pricing pages typically show the Enterprise plan first?",
        options: [
          "To generate enterprise leads",
          "Anchoring — the expensive plan makes cheaper plans feel like a deal",
          "Enterprise plans have better margins",
          "Most customers want Enterprise features",
        ],
        correctIndex: 1,
        explanation: "Anchoring: the first price seen becomes the reference point. A $200/mo plan makes $50/mo feel like a steal.",
      },
      {
        questionText: "According to Madhavan, people don't buy products. They buy:",
        options: ["Features", "Brands", "Outcomes", "Technology"],
        correctIndex: 2,
        explanation: "People buy outcomes, not products. Price the outcome (time saved, revenue gained) rather than the product itself.",
      },
    ],
  });

  await createLesson(pricing.id, {
    dayNumber: 14,
    title: "Subscription vs. Usage-Based Pricing",
    slug: "subscription-vs-usage",
    description: "When to charge flat rates vs. pay-per-use",
    difficulty: 3,
    xpReward: 25,
    youtubeId: "NR85H55eYkM",
    youtubeStart: 0,
    guestName: "Madhavan Ramanujam",
    episodeTitle: "Pricing your AI product: Lessons from 400+ companies | Madhavan Ramanujam",
    content: `Kyle Poyar of OpenView Partners shared his subscription economy research on Lenny's Podcast.

THE PRICING MODEL SPECTRUM:
- FLAT SUBSCRIPTION: Netflix, Slack (per seat). Predictable revenue, simple to understand.
- USAGE-BASED: AWS, Twilio, Snowflake. Pay for what you use. Aligns cost with value.
- HYBRID: Notion, Figma. Base subscription + usage on top. Best of both worlds.

WHEN TO USE EACH:

USE FLAT SUBSCRIPTION when:
- Usage is relatively uniform across customers
- Customers value predictability
- Switching costs are high
- Example: Slack (everyone messages roughly the same amount)

USE USAGE-BASED when:
- Usage varies 10x+ across customers
- Value delivered directly correlates with usage
- You want to reduce adoption friction (pay nothing to start)
- Example: AWS (some companies use $100/month, others $10M/month)

USE HYBRID when:
- You want predictable base revenue PLUS upside from heavy users
- Different user tiers have fundamentally different needs
- Example: Notion (free for personal, per-seat for teams, custom for enterprise)

THE KEY METRIC: Net Dollar Retention (NDR). Usage-based companies often have NDR of 120-150% — existing customers spend MORE over time without you acquiring new ones.

Kyle's insight: "The best pricing model is the one where your customers' success directly drives your revenue growth."`,
    questions: [
      {
        questionText: "When is usage-based pricing most appropriate?",
        options: [
          "When all customers use the product equally",
          "When usage varies 10x+ across customers",
          "When you want maximum predictability",
          "When switching costs are high",
        ],
        correctIndex: 1,
        explanation: "Usage-based pricing works when usage varies dramatically (10x+) across customers — it aligns cost with value delivered.",
      },
      {
        questionText: "What is Net Dollar Retention (NDR)?",
        options: [
          "Revenue from new customers only",
          "How much existing customers spend over time vs their initial spend",
          "Customer lifetime value",
          "Monthly recurring revenue growth",
        ],
        correctIndex: 1,
        explanation: "NDR measures whether existing customers spend more over time. Usage-based companies often see 120-150% NDR — growth without new acquisitions.",
      },
      {
        questionText: "Why is hybrid pricing (subscription + usage) gaining popularity?",
        options: [
          "It's the cheapest to implement",
          "It combines predictable base revenue with upside from heavy users",
          "Customers demand it",
          "It simplifies billing",
        ],
        correctIndex: 1,
        explanation: "Hybrid gives you predictable base revenue PLUS captures additional value from heavy users — best of both subscription and usage models.",
      },
    ],
  });

  // ======== LOCKED PREVIEW LESSONS (from Lenny's 289-episode archive) ========
  await createLesson(strategy.id, {
    dayNumber: 15,
    title: "Jason Cohen's 5 Questions When Growth Stops",
    slug: "jason-cohen-growth-stops",
    description: "2x unicorn founder's framework when your product plateaus",
    difficulty: 2,
    xpReward: 20,
    isLocked: true,
    guestName: "Jason Cohen",
    episodeTitle: "5 questions to ask when your product stops growing | Jason Cohen (2x unicorn founder)",
    content: `Jason Cohen, founder of WP Engine and SmartBear (both unicorns), shared his definitive framework for diagnosing growth stalls on Lenny's Podcast.

HIS 5 DIAGNOSTIC QUESTIONS:
1. LOGO RETENTION — Are you keeping customers? If logo retention (not revenue) is below 85%, you have a product-market fit problem, not a growth problem. Fix this first.
2. PRICING — Are you charging enough? Most founders underprice by 2-3x. If customers aren't pushing back on price, you're too cheap. Run a pricing experiment immediately.
3. NET REVENUE RETENTION (NRR) — Are existing customers expanding? World-class SaaS: 120%+ NRR. If NRR is below 100%, you're shrinking even while acquiring new customers.
4. MARKETING CHANNELS — Where are your best customers coming from? Double down on the one channel that works. Most companies spread too thin.
5. TARGET MARKET — Are you selling to the right people? The wrong ICP will always churn regardless of product quality.

KEY INSIGHT: "Most founders think they have a growth problem when they actually have a retention problem. You can't grow a leaky bucket."

Jason's order matters: Check retention before acquisition. Fix the floor before pouring more water in.`,
    questions: [
      {
        questionText: "According to Jason Cohen, what logo retention rate indicates a product-market fit problem?",
        options: ["Below 95%", "Below 90%", "Below 85%", "Below 70%"],
        correctIndex: 2,
        explanation: "Jason says logo retention below 85% signals a PMF problem — no growth tactic will fix a product people don't want to keep.",
      },
      {
        questionText: "What does Jason say about pricing if customers aren't pushing back?",
        options: ["Your pricing is perfect", "You're overpriced", "You're underpriced — raise it", "Focus on other problems first"],
        correctIndex: 2,
        explanation: "If no customer objects to price, you're underpriced. Most founders underprice by 2-3x. Test higher pricing immediately.",
      },
      {
        questionText: "What NRR do world-class SaaS companies achieve?",
        options: ["90%+", "100%+", "110%+", "120%+"],
        correctIndex: 3,
        explanation: "World-class SaaS targets 120%+ NRR — existing customers expand faster than others churn, creating growth without new acquisition.",
      },
    ],
  });

  await createLesson(growth.id, {
    dayNumber: 16,
    title: "Albert Cheng: Finding Hidden Growth at Duolingo",
    slug: "albert-cheng-hidden-growth",
    description: "How Duolingo, Grammarly & Chess.com find growth no one else sees",
    difficulty: 2,
    xpReward: 20,
    isLocked: true,
    guestName: "Albert Cheng",
    episodeTitle: "How to find hidden growth opportunities in your product | Albert Cheng (Duolingo, Grammarly, Chess.com)",
    content: `Albert Cheng, who drove growth at Duolingo, Grammarly, and Chess.com, shared his framework for finding non-obvious growth levers on Lenny's Podcast.

THE HIDDEN GROWTH FRAMEWORK:
Most PMs look for growth in obvious places (acquisition, onboarding, referrals). Albert looks in three underexplored areas:

1. RESURRECTION — Dormant users are your cheapest acquisition channel. At Duolingo, reactivating lapsed users cost 1/10th the CAC of new users. Who stopped using your product 90 days ago? Why?

2. FREQUENCY EXPANSION — Most products are used less than they could be. At Chess.com, Albert found that casual players who played 3x/week vs 1x/week had 5x higher LTV. What would make users come back tomorrow instead of next week?

3. DEPTH OF VALUE — Not all features are equal. Identify the features correlated with long-term retention. At Grammarly, users who enabled tone suggestions had 40% higher retention than those who didn't. What's your "tone suggestions"?

THE ANALYSIS METHOD:
1. Segment users by cohort (signup date)
2. Find cohorts with unusually high retention
3. Ask: What did these users do differently in week 1?
4. That behavior is your hidden growth lever

KEY INSIGHT: "The best growth opportunity is almost always hiding in your existing user base, not in finding new users."`,
    questions: [
      {
        questionText: "According to Albert Cheng, what makes resurrection campaigns so valuable?",
        options: [
          "Dormant users have more money",
          "Reactivating lapsed users costs ~1/10th the CAC of new users",
          "They're easier to convert",
          "They give better reviews",
        ],
        correctIndex: 1,
        explanation: "Resurrection is cheap — at Duolingo, reactivating dormant users cost 1/10th the CAC of acquiring new users.",
      },
      {
        questionText: "What is 'depth of value' analysis?",
        options: [
          "Measuring feature usage frequency",
          "Identifying features correlated with long-term retention",
          "Analyzing user lifetime value",
          "Studying power user behavior",
        ],
        correctIndex: 1,
        explanation: "Depth of value means finding which features (like Grammarly's tone suggestions) correlate with 40%+ higher retention.",
      },
      {
        questionText: "What is Albert's recommended approach to find hidden growth levers?",
        options: [
          "Run A/B tests on the homepage",
          "Interview churned users",
          "Find cohorts with unusually high retention and study week-1 behavior",
          "Benchmark against competitors",
        ],
        correctIndex: 2,
        explanation: "Find cohorts with unusually high retention → identify what they did differently in week 1 → that behavior is your growth lever.",
      },
    ],
  });

  await createLesson(pricing.id, {
    dayNumber: 17,
    title: "Madhavan Ramanujam: Pricing Your AI Product",
    slug: "madhavan-ai-pricing",
    description: "Lessons from 400+ companies on pricing the new generation of AI products",
    difficulty: 3,
    xpReward: 25,
    isLocked: true,
    guestName: "Madhavan Ramanujam",
    episodeTitle: "Pricing your AI product: Lessons from 400+ companies and 50 unicorns | Madhavan Ramanujam",
    content: `Madhavan Ramanujam returned to Lenny's Podcast specifically to address pricing in the AI era — after studying 400+ companies and 50 unicorns.

THE AI PRICING CHALLENGE:
AI products break traditional pricing models because:
1. Costs are variable (token usage, inference)
2. Value is often hard to quantify upfront
3. Users don't know what they're willing to pay for something new

THE 3 AI PRICING MODELS:
1. OUTCOME-BASED — Charge for results, not usage. "We save you $X" → charge a % of savings. Example: AI legal review tools charging per contract reviewed, not per hour.
2. SEAT-BASED + USAGE CAP — Familiar SaaS model with guardrails. Safe but leaves money on the table with power users.
3. CONSUMPTION-BASED — Pure usage pricing. Highest ceiling but lowest floor — volatile revenue.

MADHAVAN'S RECOMMENDATION FOR MOST AI STARTUPS:
Start with outcome-based pricing for your first 10 customers. This forces you to understand where you actually deliver value. Then standardize into consumption or seat-based once you understand usage patterns.

THE WILLINGNESS TO PAY RESEARCH METHOD:
Ask: "At what price would this feel expensive but still worth it?" (not "what would you pay?"). The Van Westendorp method gives you a price band, not a single number.

KEY INSIGHT: "AI products that charge per outcome rather than per token will win. Customers don't want to buy tokens — they want to buy results."`,
    questions: [
      {
        questionText: "Why do AI products break traditional pricing models?",
        options: [
          "They're too new",
          "Variable costs, hard-to-quantify value, and unknown willingness to pay",
          "Customers refuse to pay for AI",
          "Pricing tools don't work for AI",
        ],
        correctIndex: 1,
        explanation: "AI pricing is hard because costs vary (token inference), value is unclear upfront, and users lack reference points for what AI is worth.",
      },
      {
        questionText: "What does Madhavan recommend for the first 10 customers of an AI startup?",
        options: [
          "Offer it free to build traction",
          "Use consumption-based pricing",
          "Outcome-based pricing — charge for results",
          "Copy competitor pricing",
        ],
        correctIndex: 2,
        explanation: "Start outcome-based for first 10 customers — it forces clarity on where you actually deliver value before standardizing.",
      },
      {
        questionText: "What is the Van Westendorp pricing question?",
        options: [
          "'What would you pay for this?'",
          "'What price would feel expensive but still worth it?'",
          "'What is your monthly budget?'",
          "'How much does your current solution cost?'",
        ],
        correctIndex: 1,
        explanation: "Van Westendorp asks 'At what price would this feel expensive but still worth it?' — giving a price band, not a single point.",
      },
    ],
  });

  await createLesson(leadership.id, {
    dayNumber: 18,
    title: "Molly Graham: Leading Through Chaos and Scale",
    slug: "molly-graham-scale",
    description: "Frameworks from Facebook, Square & Quip for leading rapid growth",
    difficulty: 2,
    xpReward: 20,
    isLocked: true,
    guestName: "Molly Graham",
    episodeTitle: "The high-growth handbook: Molly Graham's frameworks for leading through chaos, change, and scale",
    content: `Molly Graham — who worked under Zuckerberg, Sheryl Sandberg, Chamath, and Bret Taylor — shared her playbook for leading through hypergrowth on Lenny's Podcast.

HER CORE FRAMEWORK: "Give Away Your Legos"
As companies scale, every leader must give away their legos — the pieces of their job they built and love. Leaders who can't do this become bottlenecks that kill growth.

The 4 stages of scaling leadership:
1. BUILDER (0-10 people) — You do everything. The more legos you touch, the better.
2. TEAM LEAD (10-50 people) — You start giving away legos to direct reports. This feels like loss. It is loss. Do it anyway.
3. FUNCTIONAL LEADER (50-200 people) — You're now giving away entire Lego sets — whole functions. Your job becomes culture and strategy, not execution.
4. EXECUTIVE (200+ people) — You're largely giving away the ability to know exactly what's happening. Radical trust or you go crazy.

THE BIGGEST MISTAKE: Holding onto legos you've outgrown. Every leader who failed to scale did so because they couldn't let go of the thing that made them successful at the previous level.

MOLLY'S "ORGANIZATIONAL ADOLESCENCE" CONCEPT:
At 50-150 people, companies hit a painful adolescence — too big to be scrappy, too small to have real systems. Leaders must architect through this phase, not just manage it.

KEY INSIGHT: "The job description of a leader changes completely every time the company doubles. The people who fail to scale are those who don't realize their job changed."`,
    questions: [
      {
        questionText: "What does 'Give Away Your Legos' mean in Molly's framework?",
        options: [
          "Delegate tasks you don't like",
          "Give away parts of your job you built and love as the company scales",
          "Hire people to replace you",
          "Share equity with employees",
        ],
        correctIndex: 1,
        explanation: "Giving away legos means handing off pieces of your job you built and love — the things that made you successful at the previous stage.",
      },
      {
        questionText: "What is 'organizational adolescence'?",
        options: [
          "When a company is less than 2 years old",
          "When founders are young",
          "The painful 50-150 person phase — too big to be scrappy, too small for real systems",
          "When a company goes through leadership changes",
        ],
        correctIndex: 2,
        explanation: "Organizational adolescence at 50-150 people is when companies are too big to operate scrappily but too small to have mature systems.",
      },
      {
        questionText: "According to Molly, why do leaders fail to scale?",
        options: [
          "They don't hire fast enough",
          "They can't let go of what made them successful at the previous level",
          "They lose technical skills",
          "They run out of funding",
        ],
        correctIndex: 1,
        explanation: "Leaders fail to scale when they hold onto legos they've outgrown — the skills and ownership that worked at the previous stage.",
      },
    ],
  });

  await createLesson(strategy.id, {
    dayNumber: 19,
    title: "Melanie Perkins: Building Canva to $42B",
    slug: "melanie-perkins-canva",
    description: "The founder of Canva on building from zero to $42B with design-first thinking",
    difficulty: 2,
    xpReward: 20,
    isLocked: true,
    guestName: "Melanie Perkins",
    episodeTitle: "The woman behind Canva shares how she built a $42B company from nothing | Melanie Perkins",
    content: `Melanie Perkins, co-founder and CEO of Canva, shared her story on Lenny's Podcast — from being rejected by 100 VCs to building a $42B company used by 170M+ people.

THE CANVA ORIGIN STORY:
Melanie's insight came while teaching design software at university. Students spent weeks learning Photoshop before making anything. Her hypothesis: design could be radically simpler.

She tested with Fusion Books (school yearbooks) before building Canva — proving demand before the big bet.

THE "EVERYONE CAN BE A DESIGNER" PRINCIPLE:
Canva's core insight wasn't "make design tools easier" — it was "eliminate the need for design expertise entirely." This framing led to very different product decisions:
- Remove features that imply expertise (layers, bezier curves)
- Add features that produce results (one-click resize, brand kits)
- Make the output (the design) look professional even with zero skill

MELANIE'S FUNDRAISING LESSON:
100+ rejections before getting funded. Her persistence strategy: Get 1 meeting, ask them who else they'd recommend. Build a network through rejection. Every "no" was a referral opportunity.

THE PRODUCT LESSON: Start with a constraint.
Canva was constrained to the web browser (couldn't be a desktop app) — this became a feature: real-time collaboration, no installs, always up-to-date.

KEY INSIGHT: "The best products don't target power users. They target people who need the outcome but can't afford the expertise."`,
    questions: [
      {
        questionText: "What was Canva's core insight beyond 'make design easier'?",
        options: [
          "Eliminate the need for design expertise entirely",
          "Make Photoshop cheaper",
          "Target professional designers",
          "Build on mobile first",
        ],
        correctIndex: 0,
        explanation: "Canva's insight was eliminating expertise requirements, not just simplifying tools — leading to removing layers/bezier curves but adding one-click resizing.",
      },
      {
        questionText: "How did Melanie turn 100+ VC rejections into an advantage?",
        options: [
          "She gave up and bootstrapped",
          "She asked each rejector to recommend who else to talk to — turning rejections into referrals",
          "She found angel investors instead",
          "She launched a crowdfunding campaign",
        ],
        correctIndex: 1,
        explanation: "Melanie asked every investor who rejected her for referrals — systematically building a network through rejection.",
      },
      {
        questionText: "How did Canva's web browser constraint become a feature?",
        options: [
          "It reduced development costs",
          "It enabled real-time collaboration and no-install access",
          "It was required for app store approval",
          "It made the product more secure",
        ],
        correctIndex: 1,
        explanation: "Being web-only became real-time collaboration, no installs, and always-updated — constraint became competitive advantage.",
      },
    ],
  });

  await createLesson(psychology.id, {
    dayNumber: 20,
    title: "Ravi Mehta: The AI Prototype Method",
    slug: "ravi-mehta-ai-prototype",
    description: "Why Tinder's CPO starts with JSON, not wireframes",
    difficulty: 2,
    xpReward: 20,
    isLocked: true,
    guestName: "Ravi Mehta",
    episodeTitle: "The secret to better AI prototypes: Why Tinder's CPO starts with JSON, not design | Ravi Mehta",
    content: `Ravi Mehta, former CPO of Tinder and product advisor, shared a counter-intuitive AI prototyping framework on Lenny's Podcast.

THE OLD PROTOTYPE PROCESS:
Idea → Wireframe → Design → Engineering builds → User testing → Learn

THE AI PROTOTYPE PROCESS (Ravi's method):
Idea → JSON spec → Prompt engineering → Live AI prototype → User testing → Design → Engineering

WHY JSON FIRST?
Most product ideas fail at the "will users actually engage with this?" stage — not the design stage. By starting with JSON (structured data output), you can:
1. Test the core value proposition in hours, not weeks
2. Learn if users want the content before spending on design
3. Iterate on the "what" (data/output) separately from the "how" (UX)

THE TINDER LESSON:
At Tinder, Ravi tested "would users engage with AI-generated conversation starters?" by creating a JSON spec of 50 conversation types, prompting Claude to generate them, and showing raw output to 20 users. 3-day test. No design. No engineering. Clear signal.

THE FRAMEWORK:
- Days 1-3: JSON spec + prompt → raw output test
- Days 4-7: Simple UI wrapper (v0 / lovable)
- Days 8-14: If signal positive → design & engineer properly

KEY INSIGHT: "The biggest waste in product development is building beautiful designs for ideas users don't want. Validate the content before the container."`,
    questions: [
      {
        questionText: "Why does Ravi Mehta recommend starting AI prototypes with JSON, not wireframes?",
        options: [
          "JSON is easier to build",
          "It tests core value (content) before spending on design",
          "Designers aren't needed anymore",
          "Engineers prefer JSON specs",
        ],
        correctIndex: 1,
        explanation: "JSON-first tests whether users want the content in hours — before investing weeks in design and engineering.",
      },
      {
        questionText: "What is the timeline for Ravi's AI prototype framework?",
        options: [
          "Days 1-7: Design, Days 8-14: Build",
          "Days 1-3: JSON test, Days 4-7: Simple UI, Days 8-14: Proper build",
          "Days 1-14: Full sprint with engineering",
          "Days 1-5: Wireframes, Days 6-14: Engineering",
        ],
        correctIndex: 1,
        explanation: "JSON spec + prompt test (3 days) → simple UI wrapper (4 days) → full design + engineering only if signal is positive.",
      },
      {
        questionText: "What was the Tinder AI conversation starters test?",
        options: [
          "A full product launch to 1M users",
          "A 3-day raw JSON output test with 20 users — no design, no engineering",
          "A 6-month research project",
          "An A/B test with 100K users",
        ],
        correctIndex: 1,
        explanation: "Ravi tested AI conversation starters in 3 days with raw JSON output shown to 20 users — fast signal with zero engineering.",
      },
    ],
  });

  await createLesson(duolingo.id, {
    dayNumber: 21,
    title: "Elena Verna 4.0: Growth in the AI Era",
    slug: "elena-verna-ai-growth",
    description: "How growth models are shifting in 2025 — from PLG to AI-led growth",
    difficulty: 3,
    xpReward: 25,
    isLocked: true,
    guestName: "Elena Verna",
    episodeTitle: "Elena Verna 4.0 — AI-led growth, lovability, and the death of traditional funnels",
    content: `Elena Verna returned for her 4th episode on Lenny's Podcast to discuss how AI is fundamentally changing growth models.

THE SHIFT: FROM PLG TO ALG (AI-LED GROWTH)
Traditional PLG: User discovers product → self-serves to value → converts
AI-Led Growth: AI surfaces personalized value → user experiences magic → converts at higher rates with less friction

THE 4 AI GROWTH LEVERS:
1. AI ONBOARDING — Instead of linear onboarding flows, AI personalizes the experience to each user's goals. Duolingo's AI tutor adapts difficulty in real-time, reducing churn by 23%.
2. AI RESURRECTION — AI predicts which dormant users are likely to return and what message will bring them back. 10x more effective than batch email campaigns.
3. AI PRICING — Dynamic pricing based on user's willingness to pay (usage patterns, company size, engagement). Early results: 30-40% revenue uplift.
4. AI FEATURE DISCOVERY — AI surfaces features based on user behavior, not hardcoded tooltips. Users discover features 5x faster.

THE LOVABILITY FRAMEWORK:
Elena argues growth in 2025 isn't about acquisition — it's about making products people love. "If NPS > 60, word of mouth does your growth job. Focus on love, not loops."

WHAT'S DYING:
- Generic email drip campaigns (AI personalization beats them)
- One-size-fits-all onboarding
- Relying purely on social referrals

KEY INSIGHT: "The companies winning in AI growth aren't the ones with the best growth teams — they're the ones with the best data about their users."`,
    questions: [
      {
        questionText: "What is AI-Led Growth (ALG) vs. traditional PLG?",
        options: [
          "ALG uses chatbots instead of sales teams",
          "ALG has AI surface personalized value, reducing friction to conversion",
          "ALG is just PLG with AI features",
          "ALG eliminates the need for a product team",
        ],
        correctIndex: 1,
        explanation: "ALG uses AI to surface personalized value for each user, vs PLG's generic self-serve flow — higher conversion with less friction.",
      },
      {
        questionText: "What NPS threshold does Elena say triggers word-of-mouth growth?",
        options: ["NPS > 30", "NPS > 45", "NPS > 60", "NPS > 75"],
        correctIndex: 2,
        explanation: "Elena's rule: NPS > 60 means word of mouth handles growth — focus on making the product lovable, not on growth loops.",
      },
      {
        questionText: "What growth tactic is Elena declaring dead in the AI era?",
        options: [
          "SEO",
          "Paid acquisition",
          "Generic email drip campaigns (AI personalization beats them)",
          "Product-led growth",
        ],
        correctIndex: 2,
        explanation: "Generic drip emails are dying — AI-personalized outreach based on individual behavior is 10x more effective.",
      },
    ],
  });

  await createLesson(leadership.id, {
    dayNumber: 22,
    title: "Nick Turley: Inside ChatGPT's Fastest-Growing Product",
    slug: "nick-turley-chatgpt",
    description: "How ChatGPT went from 0 to 200M weekly users — and what's next",
    difficulty: 2,
    xpReward: 20,
    isLocked: true,
    guestName: "Nick Turley",
    episodeTitle: "Inside ChatGPT: The fastest-growing product in history | Nick Turley (Head of ChatGPT at OpenAI)",
    content: `Nick Turley, Head of Product at ChatGPT, joined Lenny's Podcast to share what he's learned building the fastest-growing product in history.

THE CHATGPT GROWTH STORY:
- 1M users: 5 days (fastest ever at the time)
- 100M users: 2 months (prev record: TikTok at 9 months)
- 200M weekly users: 2 years post-launch

THE PRODUCT DECISION THAT UNLOCKED GROWTH:
The biggest unlock wasn't a feature — it was removing friction. Early ChatGPT required signup. When they added a "try without an account" option, usage exploded. Friction is often more important than features.

HOW THEY PRIORITIZE AT CHATGPT SCALE:
With 200M weekly users, even a 0.1% engagement change affects 200K people. Nick's prioritization principle:
1. Safety and trust first — always
2. Core quality (does the model actually help?) second
3. Everything else third

This sounds obvious but in practice, teams often deprioritize quality for new feature work.

THE PM'S ROLE IN AI PRODUCTS:
Traditional PM: Define requirements, manage stakeholders, ship features
ChatGPT PM: Evaluate model outputs, define evals, understand training data

Nick's insight: "The PM role is evolving. In AI products, the most important PM skill is no longer roadmap prioritization — it's knowing how to evaluate model quality."

KEY INSIGHT: "Every company will have AI products. The ones that win will be the ones that best understand what good looks like for their specific domain."`,
    questions: [
      {
        questionText: "What was ChatGPT's biggest growth unlock according to Nick Turley?",
        options: [
          "Launching the mobile app",
          "Adding GPT-4",
          "Removing signup friction with 'try without an account'",
          "Launching ChatGPT Plus",
        ],
        correctIndex: 2,
        explanation: "Removing account requirement and allowing anonymous use caused usage to explode — friction removal beat any feature.",
      },
      {
        questionText: "What is Nick's prioritization framework at ChatGPT scale?",
        options: [
          "Growth → Features → Quality",
          "Safety → Core quality → Everything else",
          "Revenue → Users → Safety",
          "Speed → Scale → Trust",
        ],
        correctIndex: 1,
        explanation: "Safety and trust first, core model quality second, new features third — this order is non-negotiable at 200M weekly users.",
      },
      {
        questionText: "How is the PM role evolving in AI products according to Nick?",
        options: [
          "PMs are being replaced by AI",
          "PMs need more engineering skills",
          "The most important skill is now evaluating model quality, not roadmap prioritization",
          "PMs should focus more on design",
        ],
        correctIndex: 2,
        explanation: "In AI products, PMs must understand how to evaluate model outputs and define quality evals — not just manage roadmaps.",
      },
    ],
  });

  // Create achievements
  const achievements = [
    { name: "First Lesson", description: "Complete your first lesson", icon: "🎯", requirement: '{"type":"lessons","value":1}' },
    { name: "Week Warrior", description: "7-day streak", icon: "🔥", requirement: '{"type":"streak","value":7}' },
    { name: "Month Master", description: "30-day streak", icon: "💎", requirement: '{"type":"streak","value":30}' },
    { name: "XP Centurion", description: "Earn 100 XP", icon: "⚡", requirement: '{"type":"xp","value":100}' },
    { name: "Half Marathon", description: "Complete 7 lessons", icon: "🏃", requirement: '{"type":"lessons","value":7}' },
    { name: "Scholar", description: "Complete all unlocked lessons", icon: "🎓", requirement: '{"type":"lessons","value":14}' },
    { name: "Perfect Score", description: "Get 100% on a quiz", icon: "💯", requirement: '{"type":"perfect","value":1}' },
    { name: "Social Climber", description: "Reach top 3 on leaderboard", icon: "🏆", requirement: '{"type":"leaderboard","value":3}' },
  ];

  for (const a of achievements) {
    await prisma.achievement.create({ data: a });
  }

  console.log("Seed completed! 14 active + 8 locked preview lessons across 6 categories, 8 achievements, and a demo user (demo@pmstreak.com / demo123)");
}

interface LessonInput {
  dayNumber: number;
  title: string;
  slug: string;
  description: string;
  difficulty: number;
  xpReward: number;
  content: string;
  isLocked?: boolean;
  youtubeId?: string;
  youtubeStart?: number;
  youtubeEnd?: number;
  guestName?: string;
  episodeTitle?: string;
  questions: {
    questionText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

async function createLesson(categoryId: string, input: LessonInput) {
  const lesson = await prisma.lesson.create({
    data: {
      title: input.title,
      slug: input.slug,
      description: input.description,
      content: input.content,
      xpReward: input.xpReward,
      difficulty: input.difficulty,
      dayNumber: input.dayNumber,
      categoryId,
      isLocked: input.isLocked ?? false,
      youtubeId: input.youtubeId ?? null,
      youtubeStart: input.youtubeStart ?? null,
      youtubeEnd: input.youtubeEnd ?? null,
      guestName: input.guestName ?? null,
      episodeTitle: input.episodeTitle ?? null,
    },
  });

  for (let i = 0; i < input.questions.length; i++) {
    const q = input.questions[i];
    await prisma.question.create({
      data: {
        lessonId: lesson.id,
        questionText: q.questionText,
        options: JSON.stringify(q.options),
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        xpReward: 5,
        sortOrder: i,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
