/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `difficulty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "difficulty_name_key" ON "difficulty"("name");
