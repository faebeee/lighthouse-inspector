-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "repoUrl" TEXT,
    "interval_reporting" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "is_running" BOOLEAN NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LighthouseRunReport" (
    "id" SERIAL NOT NULL,
    "siteId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "finalUrl" TEXT NOT NULL,
    "performance" DOUBLE PRECISION NOT NULL,
    "accessibility" DOUBLE PRECISION NOT NULL,
    "bestPractices" DOUBLE PRECISION NOT NULL,
    "SEO" DOUBLE PRECISION NOT NULL,
    "PWA" DOUBLE PRECISION NOT NULL,
    "serverResponseTime" DOUBLE PRECISION,
    "tti" DOUBLE PRECISION,
    "htmlReportFile" TEXT,
    "type" TEXT NOT NULL,
    "stacks" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "LighthouseRunReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnProject" (
    "projectId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnProject_pkey" PRIMARY KEY ("tagId","projectId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LighthouseRunReport" ADD CONSTRAINT "LighthouseRunReport_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProject" ADD CONSTRAINT "TagsOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProject" ADD CONSTRAINT "TagsOnProject_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
