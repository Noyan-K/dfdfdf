/*
  Warnings:

  - You are about to drop the column `category_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryDocument` table. If the table is not empty, all the data it contains will be lost.

*/

-- DropEnum
--DROP TYPE "DocumentTypeOfCategoryEnum";
-- CreateEnum
--CREATE TYPE "DocumentTypeOfProductEnum" AS ENUM ('MANNEQUIN', 'PREVIEW');
ALTER TYPE "DocumentTypeOfCategoryEnum" RENAME TO "DocumentTypeOfProductEnum";

-- RENAME TABLE "Category" TO "Product", "CategoryDocument" TO "ProductDocument";
ALTER TABLE "Category" RENAME TO "Product";
ALTER TABLE "CategoryDocument" RENAME TO "ProductDocument";

--    CONSTRAINT "CategoryDocument_pkey" -> "ProductDocument_pkey" |  CONSTRAINT "Category_pkey" -> "Product_pkey"
ALTER TABLE "Product" RENAME CONSTRAINT "Category_pkey" TO "Product_pkey";
ALTER TABLE "ProductDocument" RENAME CONSTRAINT "CategoryDocument_pkey" TO "ProductDocument_pkey";

-- DropForeignKey
--ALTER TABLE "Category" DROP CONSTRAINT "Category_parent_id_fkey";
-- AddForeignKey
--ALTER TABLE "Product" ADD CONSTRAINT "Product_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Product" RENAME CONSTRAINT "Category_parent_id_fkey" TO "Product_parent_id_fkey";

-- DropForeignKey
-- ALTER TABLE "CategoryDocument" DROP CONSTRAINT "category_id";
-- AddForeignKey
-- ALTER TABLE "ProductDocument" ADD CONSTRAINT "product_id" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "ProductDocument" RENAME CONSTRAINT "category_id" TO "product_id";
ALTER TABLE "ProductDocument" RENAME COLUMN "category_id" TO "product_id";

-- DropForeignKey
--ALTER TABLE "CategoryDocument" DROP CONSTRAINT "model_document_id_fk";
-- AddForeignKey
--ALTER TABLE "ProductDocument" ADD CONSTRAINT "model_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
--ALTER TABLE "ProductDocument" RENAME CONSTRAINT "model_document_id_fk" TO "model_document_id_fk";

-- DropForeignKey
--ALTER TABLE "Order" DROP CONSTRAINT "category_id";
-- AddForeignKey
--ALTER TABLE "Order" ADD CONSTRAINT "product_id" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "Order" RENAME CONSTRAINT "category_id" TO "product_id";

-- AlterTable
-- ALTER TABLE "Order" DROP COLUMN "category_id",
-- ADD COLUMN     "product_id" INTEGER;
ALTER TABLE "Order" RENAME COLUMN "category_id" TO "product_id";

DROP INDEX "CategoryDocument_category_id_type_key";
-- CreateIndex
CREATE UNIQUE INDEX "ProductDocument_product_id_type_key" ON "ProductDocument"("product_id", "type");
--ALTER INDEX "CategoryDocument_category_id_type_key" RENAME TO "ProductDocument_product_id_type_key";

ALTER SEQUENCE "CategoryDocument_id_seq" RENAME TO "ProductDocument_id_seq";
ALTER SEQUENCE "Category_id_seq" RENAME TO "Product_id_seq";
