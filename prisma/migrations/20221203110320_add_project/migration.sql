/*
  Warnings:

  - You are about to drop the column `projectName` on the `LighthouseRunReport` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `LighthouseRunReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LighthouseRunReport" DROP COLUMN "projectName",
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LighthouseRunReport" ADD CONSTRAINT "LighthouseRunReport_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
