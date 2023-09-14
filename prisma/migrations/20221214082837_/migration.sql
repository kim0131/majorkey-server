/*
  Warnings:

  - You are about to alter the column `averageScore` on the `ExpectExam` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `averageRate` on the `ExpectExam` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `expectScore` on the `ExpectExam` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `beforeExpectScore` on the `ExpectExam` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `averageRate` on the `ExpectSchool` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `averageScore` on the `ExpectSchool` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `beforeExpectScore` on the `ExpectSchool` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `expectScore` on the `ExpectSchool` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `careerRelevance` on the `ExpectStudent` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `satisfaction` on the `ExpectStudent` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `ExpectExam` MODIFY `averageScore` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `averageRate` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `expectScore` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `beforeExpectScore` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ExpectSchool` MODIFY `averageRate` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `averageScore` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `beforeExpectScore` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `expectScore` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ExpectStudent` MODIFY `careerRelevance` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `satisfaction` DOUBLE NOT NULL DEFAULT 0;
