/*
  Warnings:

  - You are about to drop the `Another` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollegeEarly` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollegeRegular` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `earlyBookMethod1` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyBookName` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyBookRate` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyBookSatLimit` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyEssayMethod1` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyEssayName` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyEssayRate` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyEssaySatLimit` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlySpecialMethod1` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlySpecialName` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlySpecialRate` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlySpecialSatLimit` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyTotal1Method1` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyTotal1Name` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyTotal1Rate` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyTotal1SatLimit` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyTotal2Method1` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyTotal2Name` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyTotal2Rate` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `earlyTotal2SatLimit` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular1Method1` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular1Name` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular1Rate` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular1Reflection` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular1SatUnit` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular2Method1` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular2Name` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular2Rate` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular2Reflection` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular2SatUnit` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Made the column `class` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `CollegeEarly` DROP FOREIGN KEY `CollegeEarly_collegeDepartmentId_fkey`;

-- DropForeignKey
ALTER TABLE `CollegeRegular` DROP FOREIGN KEY `CollegeRegular_collegeDepartmentId_fkey`;

-- AlterTable
ALTER TABLE `CollegeDepartment` ADD COLUMN `earlyBookAmount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `earlyBookMethod1` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyBookMethod2` VARCHAR(191) NULL,
    ADD COLUMN `earlyBookName` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyBookRate` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyBookSatLimit` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyEssayAmount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `earlyEssayMethod1` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyEssayMethod2` VARCHAR(191) NULL,
    ADD COLUMN `earlyEssayName` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyEssayRate` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyEssaySatLimit` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlySpecialAmount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `earlySpecialMethod1` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlySpecialMethod2` VARCHAR(191) NULL,
    ADD COLUMN `earlySpecialName` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlySpecialRate` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlySpecialSatLimit` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyTotal1Amount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `earlyTotal1Method1` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyTotal1Method2` VARCHAR(191) NULL,
    ADD COLUMN `earlyTotal1Name` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyTotal1Rate` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyTotal1SatLimit` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyTotal2Amount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `earlyTotal2Method1` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyTotal2Method2` VARCHAR(191) NULL,
    ADD COLUMN `earlyTotal2Name` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyTotal2Rate` VARCHAR(191) NOT NULL,
    ADD COLUMN `earlyTotal2SatLimit` VARCHAR(191) NOT NULL,
    ADD COLUMN `regular1Amount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `regular1Method1` VARCHAR(191) NOT NULL,
    ADD COLUMN `regular1Method2` VARCHAR(191) NULL,
    ADD COLUMN `regular1Name` VARCHAR(191) NOT NULL,
    ADD COLUMN `regular1Rate` VARCHAR(191) NOT NULL,
    ADD COLUMN `regular1Reflection` VARCHAR(191) NOT NULL,
    ADD COLUMN `regular1SatUnit` VARCHAR(191) NOT NULL,
    ADD COLUMN `regular2Amount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `regular2Method1` VARCHAR(191) NOT NULL,
    ADD COLUMN `regular2Method2` VARCHAR(191) NULL,
    ADD COLUMN `regular2Name` VARCHAR(191) NOT NULL,
    ADD COLUMN `regular2Rate` VARCHAR(191) NOT NULL,
    ADD COLUMN `regular2Reflection` VARCHAR(191) NOT NULL,
    ADD COLUMN `regular2SatUnit` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `class` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Another`;

-- DropTable
DROP TABLE `CollegeEarly`;

-- DropTable
DROP TABLE `CollegeRegular`;
