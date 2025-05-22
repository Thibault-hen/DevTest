/*
  Warnings:

  - A unique constraint covering the columns `[image_url]` on the table `quiz_image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `theme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "quiz_image_image_url_key" ON "quiz_image"("image_url");

-- CreateIndex
CREATE UNIQUE INDEX "theme_title_key" ON "theme"("title");
