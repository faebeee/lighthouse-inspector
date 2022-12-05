-- CreateTable
CREATE TABLE "LighthouseRunReport" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "finalUrl" TEXT NOT NULL,
    "performance" INTEGER NOT NULL,
    "accessibility" INTEGER NOT NULL,
    "bestPractices" INTEGER NOT NULL,
    "SEO" INTEGER NOT NULL,
    "PWA" INTEGER NOT NULL,
    "htmlReportFile" TEXT,
    "type" TEXT NOT NULL,
    "stacks" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "LighthouseRunReport_pkey" PRIMARY KEY ("id")
);
