/*
  Warnings:

  - Added the required column `rate` to the `Timesheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timesheet" ADD COLUMN     "rate" INTEGER NOT NULL;
