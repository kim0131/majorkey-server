/*
  Warnings:

  - You are about to alter the column `type` on the `ExpectStudent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `ExpectStudent` MODIFY `type` INTEGER NOT NULL;
