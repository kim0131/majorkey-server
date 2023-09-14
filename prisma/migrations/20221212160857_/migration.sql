/*
  Warnings:

  - Added the required column `averageHour` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageMinutes` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concentrationHour` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concentrationMinutes` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentalGrade` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recHour` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recMinutes` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recProblem` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreContent` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreGrade` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreTotal` to the `LearningAssessment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LearningAssessment` ADD COLUMN `actualLevel` VARCHAR(191) NULL,
    ADD COLUMN `actualMessage` VARCHAR(191) NULL,
    ADD COLUMN `advancedLevel` VARCHAR(191) NULL,
    ADD COLUMN `advancedMessage` VARCHAR(191) NULL,
    ADD COLUMN `averageHour` INTEGER NOT NULL,
    ADD COLUMN `averageMinutes` INTEGER NOT NULL,
    ADD COLUMN `concentrationHour` INTEGER NOT NULL,
    ADD COLUMN `concentrationMinutes` INTEGER NOT NULL,
    ADD COLUMN `conceptLevel` VARCHAR(191) NULL,
    ADD COLUMN `conceptMessage` VARCHAR(191) NULL,
    ADD COLUMN `mentalGrade` INTEGER NOT NULL,
    ADD COLUMN `questionLevel` VARCHAR(191) NULL,
    ADD COLUMN `questionMessage` VARCHAR(191) NULL,
    ADD COLUMN `recHour` INTEGER NOT NULL,
    ADD COLUMN `recMinutes` INTEGER NOT NULL,
    ADD COLUMN `recProblem` INTEGER NOT NULL,
    ADD COLUMN `scoreContent` VARCHAR(191) NOT NULL,
    ADD COLUMN `scoreGrade` VARCHAR(191) NOT NULL,
    ADD COLUMN `scoreTotal` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `class` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ExpectSchool` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `average` INTEGER NOT NULL,
    `unit` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExprectExam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExpectStudent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Another` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CollegeDepartmentToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CollegeDepartmentToUser_AB_unique`(`A`, `B`),
    INDEX `_CollegeDepartmentToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExpectSchool` ADD CONSTRAINT `ExpectSchool_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpectSchool` ADD CONSTRAINT `ExpectSchool_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExprectExam` ADD CONSTRAINT `ExprectExam_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExprectExam` ADD CONSTRAINT `ExprectExam_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpectStudent` ADD CONSTRAINT `ExpectStudent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeDepartmentToUser` ADD CONSTRAINT `_CollegeDepartmentToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `CollegeDepartment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeDepartmentToUser` ADD CONSTRAINT `_CollegeDepartmentToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
