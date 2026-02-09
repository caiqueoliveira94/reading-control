/*
  Warnings:

  - You are about to drop the column `current_page` on the `reading_sessions` table. All the data in the column will be lost.
  - Added the required column `start_page` to the `reading_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reading_sessions" DROP COLUMN "current_page",
ADD COLUMN     "end_page" INTEGER,
ADD COLUMN     "pages_read" INTEGER,
ADD COLUMN     "start_page" INTEGER NOT NULL;
