/*
  Warnings:

  - You are about to drop the column `project_name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Timesheet` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `Timesheet` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `Timesheet` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Timesheet` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Timesheet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectName]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Timesheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Timesheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Timesheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Timesheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Timesheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Timesheet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Timesheet" DROP CONSTRAINT "Timesheet_project_id_fkey";

-- DropIndex
DROP INDEX "Project_project_name_key";

-- DropIndex
DROP INDEX "Timesheet_project_id_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "project_name",
DROP COLUMN "user_id",
ADD COLUMN     "projectName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Timesheet" DROP COLUMN "end_date",
DROP COLUMN "end_time",
DROP COLUMN "project_id",
DROP COLUMN "start_date",
DROP COLUMN "start_time",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectName_key" ON "Project"("projectName");

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
