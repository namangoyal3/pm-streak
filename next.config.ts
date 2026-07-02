import path from "path";
import type { NextConfig } from "next";

/**
 * Pin tracing to this app root so Vercel/CI never infer a parent lockfile folder
 * as the workspace root (breaks "Collecting build traces" / serverless output).
 */
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  async rewrites() {
    return [
      {
        // Perisclaw waitlist landing is a static file in public/; serve it at a clean URL.
        source: "/perisclaw",
        destination: "/perisclaw/index.html",
      },
    ];
  },
  async redirects() {
    return [
      {
        // Duplicate slug shipped by mistake; permanent-redirect to the canonical page.
        source: "/best-project-management-tools-small-teams-2026-2026",
        destination: "/best-project-management-tools-small-teams-2026",
        permanent: true,
      },
    ];
  },
  // Crawlee / Playwright / Puppeteer use Node.js native modules — exclude from webpack bundle
  serverExternalPackages: ["crawlee", "playwright", "playwright-core", "puppeteer", "puppeteer-core", "@crawlee/playwright", "@crawlee/puppeteer"],
};

export default nextConfig;
