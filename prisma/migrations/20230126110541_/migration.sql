/*
  Warnings:

  - You are about to alter the column `second1Ability` on the `ExpectStudent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `second2Ability` on the `ExpectStudent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `ExpectStudent` MODIFY `second1Ability` INTEGER NULL,
    MODIFY `second2Ability` INTEGER NULL;
