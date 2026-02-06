/*
  Warnings:

  - You are about to drop the column `status` on the `books` table. All the data in the column will be lost.
  - The `status` column on the `reading_sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `cover_url` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReadingStatus" AS ENUM ('PENDING', 'READING', 'COMPLETED');

-- AlterTable
ALTER TABLE "books" DROP COLUMN "status",
ADD COLUMN     "cover_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reading_sessions" DROP COLUMN "status",
ADD COLUMN     "status" "ReadingStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "BookStatus";
