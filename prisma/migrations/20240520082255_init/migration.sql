/*
  Warnings:

  - Added the required column `income` to the `Timesheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timesheet" ADD COLUMN     "income" INTEGER NOT NULL;
