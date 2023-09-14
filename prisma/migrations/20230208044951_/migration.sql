/*
  Warnings:

  - You are about to drop the column `cityId` on the `Admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_cityId_fkey`;

-- AlterTable
ALTER TABLE `Admin` DROP COLUMN `cityId`;
