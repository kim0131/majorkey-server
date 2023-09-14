/*
  Warnings:

  - Added the required column `scoreGrade` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreTotal` to the `CareerAssessment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CareerAssessment` ADD COLUMN `scoreGrade` VARCHAR(191) NOT NULL,
    ADD COLUMN `scoreTotal` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CareerAssessment` ADD CONSTRAINT `CareerAssessment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
