/*
  Warnings:

  - You are about to drop the column `createDate` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Career` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Career` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `CareerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `CareerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `CollegeDepartment` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `CollegeDepartment` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `CollegeEarly` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `CollegeEarly` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `CollegeRegular` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `CollegeRegular` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `CustomizedPlan` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `CustomizedPlan` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Ebti1` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Ebti1` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Ebti1Quest` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Ebti1Quest` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `LearningAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `LearningAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `Textbook` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `Textbook` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Admin` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `Career` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `CareerDetail` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `City` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `College` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `CollegeDepartment` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `CollegeEarly` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `CollegeRegular` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `CustomizedPlan` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `Ebti1` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `Ebti1Quest` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `Grade` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `LearningAssessment` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `Manager` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `School` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `Subject` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `Textbook` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createDate`,
    DROP COLUMN `updateDate`;
