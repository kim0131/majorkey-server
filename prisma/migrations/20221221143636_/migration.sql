/*
  Warnings:

  - Added the required column `ability` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abilityDetail` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `field` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isInSchool` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `save` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technique` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateDate` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CareerAssessment` ADD COLUMN `ability` INTEGER NOT NULL,
    ADD COLUMN `abilityDetail` INTEGER NOT NULL,
    ADD COLUMN `activity` INTEGER NOT NULL,
    ADD COLUMN `activityContent` VARCHAR(191) NULL,
    ADD COLUMN `activityReview` VARCHAR(191) NULL,
    ADD COLUMN `activityTrigger` VARCHAR(191) NULL,
    ADD COLUMN `careerRelevance` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `field` INTEGER NOT NULL,
    ADD COLUMN `isInSchool` BOOLEAN NOT NULL,
    ADD COLUMN `month` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` INTEGER NOT NULL,
    ADD COLUMN `satisfaction` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `save` INTEGER NOT NULL,
    ADD COLUMN `selfDirected` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `subjectId` INTEGER NULL,
    ADD COLUMN `technique` INTEGER NOT NULL,
    ADD COLUMN `topic` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` INTEGER NOT NULL,
    ADD COLUMN `updateDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `CollegeDepartment` ADD COLUMN `etc1` VARCHAR(191) NULL,
    ADD COLUMN `etc10` VARCHAR(191) NULL,
    ADD COLUMN `etc2` VARCHAR(191) NULL,
    ADD COLUMN `etc3` VARCHAR(191) NULL,
    ADD COLUMN `etc4` VARCHAR(191) NULL,
    ADD COLUMN `etc5` VARCHAR(191) NULL,
    ADD COLUMN `etc6` VARCHAR(191) NULL,
    ADD COLUMN `etc7` VARCHAR(191) NULL,
    ADD COLUMN `etc8` VARCHAR(191) NULL,
    ADD COLUMN `etc9` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `thumbnail` LONGTEXT NULL;

-- AddForeignKey
ALTER TABLE `CareerAssessment` ADD CONSTRAINT `CareerAssessment_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
