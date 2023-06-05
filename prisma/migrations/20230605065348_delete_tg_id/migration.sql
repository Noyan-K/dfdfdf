/*
  Warnings:

  - You are about to drop the column `telegram_id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_telegram_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "telegram_id";
