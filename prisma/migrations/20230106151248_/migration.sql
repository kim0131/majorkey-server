/*
  Warnings:

  - Added the required column `managerId` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Trainer` ADD COLUMN `managerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Trainer` ADD CONSTRAINT `Trainer_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Manager`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
