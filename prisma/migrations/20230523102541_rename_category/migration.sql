/*
  Warnings:

  - You are about to drop the column `category_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DocumentTypeOfProductEnum" AS ENUM ('MANNEQUIN', 'PREVIEW');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "CategoryDocument" DROP CONSTRAINT "category_id";

-- DropForeignKey
ALTER TABLE "CategoryDocument" DROP CONSTRAINT "model_document_id_fk";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "category_id";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "category_id",
ADD COLUMN     "product_id" INTEGER;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "CategoryDocument";

-- DropEnum
DROP TYPE "DocumentTypeOfCategoryEnum";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parent_id" INTEGER,
    "mannequin" "MannequinPositionEnum",
    "sex" "ClothSexEnum",
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDocument" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "document_id" INTEGER NOT NULL,
    "type" "DocumentTypeOfProductEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ProductDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductDocument_product_id_type_key" ON "ProductDocument"("product_id", "type");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "product_id" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDocument" ADD CONSTRAINT "product_id" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductDocument" ADD CONSTRAINT "model_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
