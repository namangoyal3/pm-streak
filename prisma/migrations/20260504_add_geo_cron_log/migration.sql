-- CreateTable
CREATE TABLE "GeoPageTriage" (
    "slug" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "currentCitability" DOUBLE PRECISION,
    "currentSeoScore" INTEGER,
    "ga4Sessions30d" INTEGER,
    "attributedLeads30d" INTEGER,
    "hasArticleSchema" BOOLEAN NOT NULL DEFAULT false,
    "hasFaqSchema" BOOLEAN NOT NULL DEFAULT false,
    "hasFaqSection" BOOLEAN NOT NULL DEFAULT false,
    "wordCount" INTEGER,
    "tier" TEXT,
    "jobStatus" TEXT NOT NULL DEFAULT 'pending',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "lastShippedPrUrl" TEXT,
    "lastShippedAt" TIMESTAMP(3),
    "inventoriedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeoPageTriage_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "GeoCronLog" (
    "id" TEXT NOT NULL,
    "cronId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeoCronLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GeoCronLog_cronId_createdAt_idx" ON "GeoCronLog"("cronId", "createdAt");

-- CreateIndex
CREATE INDEX "GeoPageTriage_tier_jobStatus_idx" ON "GeoPageTriage"("tier", "jobStatus");

-- CreateIndex
CREATE INDEX "GeoPageTriage_jobStatus_attempts_idx" ON "GeoPageTriage"("jobStatus", "attempts");
