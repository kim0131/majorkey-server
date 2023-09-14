/*
  Warnings:

  - Made the column `subjectId` on table `CareerAssessment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `CareerAssessment` DROP FOREIGN KEY `CareerAssessment_subjectId_fkey`;

-- AlterTable
ALTER TABLE `CareerAssessment` MODIFY `subjectId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CareerAssessment` ADD CONSTRAINT `CareerAssessment_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
