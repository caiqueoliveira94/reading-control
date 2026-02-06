/*
  Warnings:

  - A unique constraint covering the columns `[google_book_id]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "books_google_book_id_key" ON "books"("google_book_id");
