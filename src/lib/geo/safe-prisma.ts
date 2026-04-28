import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// Allowlisted queries for GEO agent tool routes.
// All Prisma writes from agent routes MUST go through these helpers.
// No raw SQL from agents.

export async function createOpportunity(data: {
  query: string;
  intentScore: number;
  source: string;
  currentTop3: Prisma.InputJsonValue;
  gapScore: number;
}) {
  return prisma.geoOpportunity.create({ data });
}

export async function listUnaddressedOpportunities(limit = 50) {
  return prisma.geoOpportunity.findMany({
    where: { addressed: false },
    orderBy: { intentScore: "desc" },
    take: limit,
  });
}

export async function markOpportunityAddressed(id: string, pageSlug: string) {
  return prisma.geoOpportunity.update({
    where: { id },
    data: { addressed: true, pageSlug },
  });
}

export async function createPageMetric(data: {
  slug: string;
  citabilityScore: number;
  ga4Sessions: number;
  attributedLeads: number;
  citationCount: number;
}) {
  return prisma.geoPageMetric.create({ data });
}

export async function getPageMetrics(slug: string, days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  return prisma.geoPageMetric.findMany({
    where: { slug, snapshotDate: { gte: since } },
    orderBy: { snapshotDate: "desc" },
  });
}

export async function getLatestMetrics(limit = 100) {
  return prisma.geoPageMetric.findMany({
    orderBy: { snapshotDate: "desc" },
    take: limit,
    distinct: ["slug"],
  });
}

export async function createCitation(data: {
  pageSlug: string;
  source: string;
  url: string;
  status: string;
  draftBody?: string;
}) {
  return prisma.geoCitation.create({ data });
}

export async function listCitationsByStatus(status: string) {
  return prisma.geoCitation.findMany({
    where: { status },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateCitationStatus(id: string, status: string, approvedBy?: string) {
  return prisma.geoCitation.update({
    where: { id },
    data: { status, approvedBy },
  });
}

export async function publishArticle(data: {
  slug: string;
  title: string;
  description: string;
  body: string;
  vertical?: string;
}) {
  const { slug, title, description, body, vertical = "pm" } = data;
  return prisma.article.upsert({
    where: { slug },
    update: { title, description, body, published: true, updatedAt: new Date() },
    create: { slug, title, description, body, vertical, published: true },
    select: { id: true, slug: true, vertical: true },
  });
}
