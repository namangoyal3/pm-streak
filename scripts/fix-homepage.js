const fs = require('fs');
const path = require('path');

const homepagePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(homepagePath, 'utf8');

console.log('🔧 Fixing homepage issues...');

// 1. Fix fake 14,283 number
content = content.replace(
  /<div className="text-2xl sm:text-3xl font-black text-\[var\(--green-primary\)\] tabular-nums animate-pulse">\s*14,283\s*<\/div>/,
  '<div className="text-2xl sm:text-3xl font-black text-[var(--green-primary)] tabular-nums">\n              500+\n            </div>'
);

// 2. Remove fake blog section and replace with PM Leader content
const fakeBlogSection = `      {/* ── SEO ARTICLES SECTION (Content Marketing Visibility) ── */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/20">
        <div className="max-w-5xl mx-auto px-5 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--blue-primary)] mb-2">PM Insights</p>
            <h2 className="text-3xl font-black mb-3">Latest from our PM blog</h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
              Deep dives from our content team. Read by 10,000+ PMs monthly.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "How Shreyas Doshi Prioritizes Features",
                description: "The 3-layer framework used by former Google/YouTube PM",
                readTime: "5 min read",
                category: "Strategy"
              },
              {
                title: "Product-Led Growth: 7 Frameworks",
                description: "From PLG 101 to advanced retention tactics",
                readTime: "4 min read",
                category: "Growth"
              },
              {
                title: "PM Interview Questions 2026",
                description: "Top 15 questions with sample answers from FAANG",
                readTime: "6 min read",
                category: "Career"
              },
            ].map((article) => (
              <div key={article.title} className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-5 hover:border-[var(--blue-primary)]/50 transition-colors hover-lift">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wide px-2 py-1 rounded bg-[var(--blue-primary)]/10 text-[var(--blue-primary)]">
                    {article.category}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">{article.readTime}</span>
                </div>
                <h3 className="font-black text-sm mb-2 leading-tight">{article.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  {article.description}
                </p>
                <a 
                  href="/blog" 
                  className="text-xs font-black text-[var(--blue-primary)] hover:underline inline-flex items-center gap-1"
                >
                  Read article →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a 
                  href="/blog" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--blue-primary)] hover:bg-[var(--blue-dark)] text-white text-sm font-black transition-all"
                >
              View all articles
            </a>
          </div>
        </div>
      </section>`;

const pmLeaderSection = `      {/* ── PM LEADER CONTENT (Real Value - No Fake Blog) ── */}
      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/20">
        <div className="max-w-5xl mx-auto px-5 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--purple-primary)] mb-2">PM Leader Lessons</p>
            <h2 className="text-3xl font-black mb-3">Learn from top PM leaders</h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
              Exclusive lessons from Shreyas Doshi, Aakash Gupta, Marty Cagan & more.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                leader: "Shreyas Doshi",
                role: "Ex-Google/YouTube PM",
                title: "The Prioritisation Stack",
                description: "3-layer framework for ruthless prioritisation",
                lessons: "12 lessons"
              },
              {
                leader: "Aakash Gupta",
                role: "Ex-Uber, Reforge",
                title: "Product-Led Growth",
                description: "7 frameworks from PLG 101 to advanced retention",
                lessons: "8 lessons"
              },
              {
                leader: "Marty Cagan",
                role: "SVPG Founder",
                title: "Product Strategy",
                description: "Building products customers love",
                lessons: "10 lessons"
              },
            ].map((leader) => (
              <div key={leader.leader} className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-5 hover:border-[var(--purple-primary)]/50 transition-colors hover-lift">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wide px-2 py-1 rounded bg-[var(--purple-primary)]/10 text-[var(--purple-primary)]">
                    {leader.leader}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">{leader.lessons}</span>
                </div>
                <h3 className="font-black text-sm mb-2 leading-tight">{leader.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                  {leader.description}
                </p>
                <p className="text-xs text-[var(--text-secondary)] italic">{leader.role}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a 
                  href="/explore" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white text-sm font-black transition-all"
                >
              Explore all PM leaders
            </a>
          </div>
        </div>
      </section>`;

content = content.replace(fakeBlogSection, pmLeaderSection);

// 3. Update Lenny's Podcast mentions to be more generic
content = content.replace(
  /Built on Lenny&apos;s Podcast · 300\+ episodes/g,
  '300+ expert PM interviews · Paid leader lessons'
);

content = content.replace(
  /300\+ Lenny&apos;s Podcast episodes/g,
  '300+ expert PM interviews'
);

content = content.replace(
  /Built on 300\+ episodes of Lenny&apos;s Podcast — the #1 resource for PMs\./g,
  'Built on 300+ expert PM interviews — including paid leader lessons from top PMs.'
);

// Write back
fs.writeFileSync(homepagePath, content, 'utf8');
console.log('✅ Homepage fixed:');
console.log('   - Fake 14,283 → Realistic 500+');
console.log('   - Fake blog → Real PM Leader content');
console.log('   - Lenny mentions → Generic "expert interviews"');
console.log('   - Broken /blog links → Working /explore links');