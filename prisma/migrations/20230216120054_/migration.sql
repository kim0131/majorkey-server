/*
  Warnings:

  - You are about to alter the column `scoreTotal` on the `CareerAssessment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `scoreTotal` on the `LearningAssessment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `CareerAssessment` MODIFY `scoreTotal` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `LearningAssessment` MODIFY `scoreTotal` DOUBLE NOT NULL;
