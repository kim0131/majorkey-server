/*
  Warnings:

  - A unique constraint covering the columns `[name,collegeId]` on the table `CollegeDepartment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `CollegeDepartment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CollegeDepartment` ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CollegeDepartment_name_collegeId_key` ON `CollegeDepartment`(`name`, `collegeId`);
