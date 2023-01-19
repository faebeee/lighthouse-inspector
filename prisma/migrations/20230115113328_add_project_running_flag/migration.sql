/*
  Warnings:

  - Added the required column `is_running` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "is_running" BOOLEAN NOT NULL DEFAULT false;
