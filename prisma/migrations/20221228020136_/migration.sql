/*
  Warnings:

  - Made the column `userId` on table `CareerAssessment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `CareerAssessment` DROP FOREIGN KEY `CareerAssessment_userId_fkey`;

-- AlterTable
ALTER TABLE `CareerAssessment` MODIFY `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Ebti` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL DEFAULT 0,
    `type` VARCHAR(191) NOT NULL,
    `real` INTEGER NOT NULL,
    `habit` INTEGER NOT NULL,
    `research` INTEGER NOT NULL,
    `progress` INTEGER NOT NULL,
    `society` INTEGER NOT NULL,
    `art` INTEGER NOT NULL,
    `answer1` INTEGER NOT NULL,
    `answer2` INTEGER NOT NULL,
    `answer3` INTEGER NOT NULL,
    `answer4` INTEGER NOT NULL,
    `answer5` INTEGER NOT NULL,
    `answer6` INTEGER NOT NULL,
    `answer7` INTEGER NOT NULL,
    `answer8` INTEGER NOT NULL,
    `answer9` INTEGER NOT NULL,
    `answer10` INTEGER NOT NULL,
    `answer11` INTEGER NOT NULL,
    `answer12` INTEGER NOT NULL,
    `answer13` INTEGER NOT NULL,
    `answer14` INTEGER NOT NULL,
    `answer15` INTEGER NOT NULL,
    `answer16` INTEGER NOT NULL,
    `answer17` INTEGER NOT NULL,
    `answer18` INTEGER NOT NULL,
    `answer19` INTEGER NOT NULL,
    `answer20` INTEGER NOT NULL,
    `answer21` INTEGER NOT NULL,
    `answer22` INTEGER NOT NULL,
    `answer23` INTEGER NOT NULL,
    `answer24` INTEGER NOT NULL,
    `answer25` INTEGER NOT NULL,
    `answer26` INTEGER NOT NULL,
    `answer27` INTEGER NOT NULL,
    `answer28` INTEGER NOT NULL,
    `answer29` INTEGER NOT NULL,
    `answer30` INTEGER NOT NULL,
    `answer31` INTEGER NOT NULL,
    `answer32` INTEGER NOT NULL,
    `answer33` INTEGER NOT NULL,
    `answer34` INTEGER NOT NULL,
    `answer35` INTEGER NOT NULL,
    `answer36` INTEGER NOT NULL,
    `answer37` INTEGER NOT NULL,
    `answer38` INTEGER NOT NULL,
    `answer39` INTEGER NOT NULL,
    `answer40` INTEGER NOT NULL,
    `answer41` INTEGER NOT NULL,
    `answer42` INTEGER NOT NULL,
    `answer43` INTEGER NOT NULL,
    `answer44` INTEGER NOT NULL,
    `answer45` INTEGER NOT NULL,
    `answer46` INTEGER NOT NULL,
    `answer47` INTEGER NOT NULL,
    `answer48` INTEGER NOT NULL,
    `answer49` INTEGER NOT NULL,
    `answer50` INTEGER NOT NULL,
    `answer51` INTEGER NOT NULL,
    `answer52` INTEGER NOT NULL,
    `answer53` INTEGER NOT NULL,
    `answer54` INTEGER NOT NULL,
    `answer55` INTEGER NOT NULL,
    `answer56` INTEGER NOT NULL,
    `answer57` INTEGER NOT NULL,
    `answer58` INTEGER NOT NULL,
    `answer59` INTEGER NOT NULL,
    `answer60` INTEGER NOT NULL,
    `result1` INTEGER NOT NULL,
    `result2` INTEGER NOT NULL,
    `result3` INTEGER NOT NULL,
    `result4` INTEGER NOT NULL,
    `result5` INTEGER NOT NULL,
    `result6` INTEGER NOT NULL,
    `result7` INTEGER NOT NULL,
    `result8` INTEGER NOT NULL,
    `result9` INTEGER NOT NULL,
    `result10` INTEGER NOT NULL,
    `result11` INTEGER NOT NULL,
    `result12` INTEGER NOT NULL,
    `result13` INTEGER NOT NULL,
    `result14` INTEGER NOT NULL,
    `result15` INTEGER NOT NULL,
    `result16` INTEGER NOT NULL,
    `result17` INTEGER NOT NULL,
    `result18` INTEGER NOT NULL,
    `result19` INTEGER NOT NULL,
    `result20` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EbtiQuest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CareerAssessment` ADD CONSTRAINT `CareerAssessment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ebti` ADD CONSTRAINT `Ebti_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
