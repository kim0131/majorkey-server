/*
  Warnings:

  - Added the required column `businessAddress` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessAddressDetail` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessCeoName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorkeyAddress` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorkeyAddressDetail` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorkeyCeoName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorkeyName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorkeyNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `majorkeyPhone` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `businessAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `businessAddressDetail` VARCHAR(191) NOT NULL,
    ADD COLUMN `businessCeoName` VARCHAR(191) NOT NULL,
    ADD COLUMN `businessName` VARCHAR(191) NOT NULL,
    ADD COLUMN `businessNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `majorkeyAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `majorkeyAddressDetail` VARCHAR(191) NOT NULL,
    ADD COLUMN `majorkeyCeoName` VARCHAR(191) NOT NULL,
    ADD COLUMN `majorkeyName` VARCHAR(191) NOT NULL,
    ADD COLUMN `majorkeyNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `majorkeyPhone` VARCHAR(191) NOT NULL;
