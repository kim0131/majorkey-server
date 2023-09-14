-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `cityId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Trainer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `anotherCourse` BOOLEAN NOT NULL,
    `anotherStudent` BOOLEAN NOT NULL,
    `anotherEarly` BOOLEAN NOT NULL,
    `anotherRegular` BOOLEAN NOT NULL,
    `monday` VARCHAR(191) NOT NULL,
    `tuesday` VARCHAR(191) NOT NULL,
    `wednesday` VARCHAR(191) NOT NULL,
    `thursday` VARCHAR(191) NOT NULL,
    `friday` VARCHAR(191) NOT NULL,
    `saturday` VARCHAR(191) NOT NULL,
    `sunday` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SubjectToTrainer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SubjectToTrainer_AB_unique`(`A`, `B`),
    INDEX `_SubjectToTrainer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SubjectToTrainer` ADD CONSTRAINT `_SubjectToTrainer_A_fkey` FOREIGN KEY (`A`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SubjectToTrainer` ADD CONSTRAINT `_SubjectToTrainer_B_fkey` FOREIGN KEY (`B`) REFERENCES `Trainer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
