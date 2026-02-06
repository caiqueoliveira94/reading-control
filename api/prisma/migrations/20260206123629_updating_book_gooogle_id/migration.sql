/*
  Warnings:

  - Added the required column `google_book_id` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "google_book_id" TEXT NOT NULL;
