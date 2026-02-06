/*
  Warnings:

  - You are about to drop the column `current_page` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "current_page";

-- AlterTable
ALTER TABLE "reading_sessions" ADD COLUMN     "current_page" INTEGER NOT NULL DEFAULT 0;
