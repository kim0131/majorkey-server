/*
  Warnings:

  - You are about to alter the column `actualLevel` on the `LearningAssessment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `advancedLevel` on the `LearningAssessment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `conceptLevel` on the `LearningAssessment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `questionLevel` on the `LearningAssessment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `LearningAssessment` MODIFY `actualLevel` INTEGER NULL,
    MODIFY `advancedLevel` INTEGER NULL,
    MODIFY `conceptLevel` INTEGER NULL,
    MODIFY `questionLevel` INTEGER NULL;
