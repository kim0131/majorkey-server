/*
  Warnings:

  - You are about to drop the `Consult1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consult2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consult3` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MyLearning` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Admin` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Career` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `CareerDetail` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `City` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `College` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `CollegeDepartment` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `CollegeEarly` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `CollegeRegular` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `CustomizedPlan` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Ebti1` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Ebti1Quest` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Grade` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `LearningAssessment` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Manager` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `School` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Subject` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Textbook` ALTER COLUMN `updateDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` ALTER COLUMN `updateDate` DROP DEFAULT;

-- DropTable
DROP TABLE `Consult1`;

-- DropTable
DROP TABLE `Consult2`;

-- DropTable
DROP TABLE `Consult3`;

-- DropTable
DROP TABLE `MyLearning`;
