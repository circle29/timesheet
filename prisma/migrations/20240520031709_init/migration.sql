/*
  Warnings:

  - Added the required column `activityName` to the `Timesheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timesheet" ADD COLUMN     "activityName" TEXT NOT NULL;
