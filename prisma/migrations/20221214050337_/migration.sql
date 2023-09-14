/*
  Warnings:

  - A unique constraint covering the columns `[userId,subjectId]` on the table `ExpectExam` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,subjectId]` on the table `ExpectSchool` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,type]` on the table `ExpectStudent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ExpectExam_userId_subjectId_key` ON `ExpectExam`(`userId`, `subjectId`);

-- CreateIndex
CREATE UNIQUE INDEX `ExpectSchool_userId_subjectId_key` ON `ExpectSchool`(`userId`, `subjectId`);

-- CreateIndex
CREATE UNIQUE INDEX `ExpectStudent_userId_type_key` ON `ExpectStudent`(`userId`, `type`);
