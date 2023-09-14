-- AlterTable
ALTER TABLE `User` ADD COLUMN `managerDate` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `managerId` INTEGER NOT NULL,
    `name` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `businessPhone` VARCHAR(191) NOT NULL,
    `olderPrice` INTEGER NOT NULL DEFAULT 0,
    `olderMember` INTEGER NOT NULL DEFAULT 0,
    `firstPrice` INTEGER NOT NULL DEFAULT 0,
    `firstMember` INTEGER NOT NULL DEFAULT 0,
    `secondPrice` INTEGER NOT NULL DEFAULT 0,
    `secondMember` INTEGER NOT NULL DEFAULT 0,
    `thirdPrice` INTEGER NOT NULL DEFAULT 0,
    `thirdMember` INTEGER NOT NULL DEFAULT 0,
    `totalPrice` INTEGER NOT NULL DEFAULT 0,
    `totalMember` INTEGER NOT NULL DEFAULT 0,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvoiceUserLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` INTEGER NOT NULL DEFAULT 1,
    `managerId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Manager`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceUserLog` ADD CONSTRAINT `InvoiceUserLog_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Manager`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoiceUserLog` ADD CONSTRAINT `InvoiceUserLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
