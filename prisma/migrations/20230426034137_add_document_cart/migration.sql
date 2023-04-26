/*
  Warnings:

  - Added the required column `document_id` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "document_id" INTEGER NOT NULL;
