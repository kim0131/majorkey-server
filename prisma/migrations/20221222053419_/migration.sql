/*
  Warnings:

  - Added the required column `type` to the `CustomizedPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CustomizedPlan` ADD COLUMN `type` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Textbook` ADD COLUMN `publisher` VARCHAR(191) NULL,
    ADD COLUMN `subjectId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Trainer` MODIFY `thumbnail` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `managerState` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Textbook` ADD CONSTRAINT `Textbook_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
