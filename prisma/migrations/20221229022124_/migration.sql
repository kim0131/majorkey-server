/*
  Warnings:

  - You are about to drop the column `result1` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result10` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result11` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result12` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result13` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result14` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result15` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result16` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result17` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result18` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result19` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result2` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result20` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result3` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result4` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result5` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result6` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result7` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result8` on the `Ebti` table. All the data in the column will be lost.
  - You are about to drop the column `result9` on the `Ebti` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Ebti` DROP COLUMN `result1`,
    DROP COLUMN `result10`,
    DROP COLUMN `result11`,
    DROP COLUMN `result12`,
    DROP COLUMN `result13`,
    DROP COLUMN `result14`,
    DROP COLUMN `result15`,
    DROP COLUMN `result16`,
    DROP COLUMN `result17`,
    DROP COLUMN `result18`,
    DROP COLUMN `result19`,
    DROP COLUMN `result2`,
    DROP COLUMN `result20`,
    DROP COLUMN `result3`,
    DROP COLUMN `result4`,
    DROP COLUMN `result5`,
    DROP COLUMN `result6`,
    DROP COLUMN `result7`,
    DROP COLUMN `result8`,
    DROP COLUMN `result9`;

-- CreateTable
CREATE TABLE `Ebti2` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL DEFAULT 0,
    `type` VARCHAR(191) NOT NULL,
    `language` INTEGER NOT NULL,
    `math` INTEGER NOT NULL,
    `view` INTEGER NOT NULL,
    `body` INTEGER NOT NULL,
    `music` INTEGER NOT NULL,
    `nature` INTEGER NOT NULL,
    `self` INTEGER NOT NULL,
    `interpersonal` INTEGER NOT NULL,
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
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ebti2Quest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ebti2` ADD CONSTRAINT `Ebti2_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
