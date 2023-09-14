/*
  Warnings:

  - Added the required column `earlyTotalAmount` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regularTotalAmount` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CollegeDepartment` ADD COLUMN `earlyTotalAmount` INTEGER NOT NULL,
    ADD COLUMN `regularTotalAmount` INTEGER NOT NULL;
