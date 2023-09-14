/*
  Warnings:

  - You are about to alter the column `percentArt` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentHabit` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentProgress` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentReal` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentResearch` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentSociety` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreArt` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreHabit` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreProgress` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreReal` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreResearch` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreSociety` on the `Ebti` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentChaeum` on the `Ebti1` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentDotum` on the `Ebti1` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentKium` on the `Ebti1` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentSaeum` on the `Ebti1` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreChaeum` on the `Ebti1` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreDotum` on the `Ebti1` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreKium` on the `Ebti1` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreSaeum` on the `Ebti1` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentBody` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentInterpersonal` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentLanguage` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentMath` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentMusic` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentNature` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentSelf` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `percentView` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreBody` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreInterpersonal` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreLanguage` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreMath` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreMusic` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreNature` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreSelf` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tscoreView` on the `Ebti2` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Ebti` MODIFY `percentArt` DOUBLE NOT NULL,
    MODIFY `percentHabit` DOUBLE NOT NULL,
    MODIFY `percentProgress` DOUBLE NOT NULL,
    MODIFY `percentReal` DOUBLE NOT NULL,
    MODIFY `percentResearch` DOUBLE NOT NULL,
    MODIFY `percentSociety` DOUBLE NOT NULL,
    MODIFY `tscoreArt` DOUBLE NOT NULL,
    MODIFY `tscoreHabit` DOUBLE NOT NULL,
    MODIFY `tscoreProgress` DOUBLE NOT NULL,
    MODIFY `tscoreReal` DOUBLE NOT NULL,
    MODIFY `tscoreResearch` DOUBLE NOT NULL,
    MODIFY `tscoreSociety` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Ebti1` MODIFY `percentChaeum` DOUBLE NOT NULL,
    MODIFY `percentDotum` DOUBLE NOT NULL,
    MODIFY `percentKium` DOUBLE NOT NULL,
    MODIFY `percentSaeum` DOUBLE NOT NULL,
    MODIFY `tscoreChaeum` DOUBLE NOT NULL,
    MODIFY `tscoreDotum` DOUBLE NOT NULL,
    MODIFY `tscoreKium` DOUBLE NOT NULL,
    MODIFY `tscoreSaeum` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Ebti2` MODIFY `percentBody` DOUBLE NOT NULL,
    MODIFY `percentInterpersonal` DOUBLE NOT NULL,
    MODIFY `percentLanguage` DOUBLE NOT NULL,
    MODIFY `percentMath` DOUBLE NOT NULL,
    MODIFY `percentMusic` DOUBLE NOT NULL,
    MODIFY `percentNature` DOUBLE NOT NULL,
    MODIFY `percentSelf` DOUBLE NOT NULL,
    MODIFY `percentView` DOUBLE NOT NULL,
    MODIFY `tscoreBody` DOUBLE NOT NULL,
    MODIFY `tscoreInterpersonal` DOUBLE NOT NULL,
    MODIFY `tscoreLanguage` DOUBLE NOT NULL,
    MODIFY `tscoreMath` DOUBLE NOT NULL,
    MODIFY `tscoreMusic` DOUBLE NOT NULL,
    MODIFY `tscoreNature` DOUBLE NOT NULL,
    MODIFY `tscoreSelf` DOUBLE NOT NULL,
    MODIFY `tscoreView` DOUBLE NOT NULL;
