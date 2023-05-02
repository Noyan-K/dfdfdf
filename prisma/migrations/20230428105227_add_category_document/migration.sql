/*
  Warnings:

  - You are about to drop the column `document_id` on the `Category` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DocumentTypeOfCategoryEnum" AS ENUM ('MANNEQUIN', 'PREVIEW');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "document_id";

-- CreateTable
CREATE TABLE "CategoryDocument" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "document_id" INTEGER NOT NULL,
    "type" "DocumentTypeOfCategoryEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "CategoryDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryDocument_category_id_type_key" ON "CategoryDocument"("category_id", "type");

-- AddForeignKey
ALTER TABLE "CategoryDocument" ADD CONSTRAINT "category_id" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
