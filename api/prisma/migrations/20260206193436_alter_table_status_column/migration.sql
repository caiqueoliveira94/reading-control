/*
  Warnings:

  - You are about to drop the column `status` on the `reading_sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "status" "ReadingStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "reading_sessions" DROP COLUMN "status";
