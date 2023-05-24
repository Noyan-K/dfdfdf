/*
  Warnings:

  - You are about to drop the column `currency_id` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `currency_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Currency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CurrencyRate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Description` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModelProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupplierProductPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "category_id";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "model_document_id_fk";

-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "CartSize" DROP CONSTRAINT "cart_id";

-- DropForeignKey
ALTER TABLE "CartSize" DROP CONSTRAINT "size_id";

-- DropForeignKey
ALTER TABLE "CurrencyRate" DROP CONSTRAINT "currency_id";

-- DropForeignKey
ALTER TABLE "Description" DROP CONSTRAINT "description_language_id";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "model_vendor_id_fk";

-- DropForeignKey
ALTER TABLE "ModelProduct" DROP CONSTRAINT "modelProdcut_model_id";

-- DropForeignKey
ALTER TABLE "ModelProduct" DROP CONSTRAINT "modelProdcut_prodcut_id";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "product_category_id_fk";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "product_description_id_fk";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "product_vendor_id_fk";

-- DropForeignKey
ALTER TABLE "ProductDocument" DROP CONSTRAINT "model_document_id_fk";

-- DropForeignKey
ALTER TABLE "ProductDocument" DROP CONSTRAINT "model_product_id_fk";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "user_id";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "currency_id";

-- DropForeignKey
ALTER TABLE "SupplierProductPrice" DROP CONSTRAINT "currency_id";

-- DropForeignKey
ALTER TABLE "SupplierProductPrice" DROP CONSTRAINT "product_id";

-- DropForeignKey
ALTER TABLE "SupplierProductPrice" DROP CONSTRAINT "supplier_id";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "currency_id";

-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "model_document_id_fk";

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "currency_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "currency_id";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "CartProduct";

-- DropTable
DROP TABLE "CartSize";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Currency";

-- DropTable
DROP TABLE "CurrencyRate";

-- DropTable
DROP TABLE "Description";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "Model";

-- DropTable
DROP TABLE "ModelProduct";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductDocument";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "SupplierProductPrice";

-- DropTable
DROP TABLE "Vendor";

-- DropEnum
DROP TYPE "CartType";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "document_id" INTEGER,
    "cloth_sex" "ClothSexEnum" NOT NULL,
    "category_id" INTEGER,
    "custom_size" VARCHAR(1024),
    "custom_model" VARCHAR(1024),
    "custom_knot" VARCHAR(1024),
    "custom_textile" VARCHAR(1024),
    "additional_materials" VARCHAR(1024),
    "artistic_description" VARCHAR(1024),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderSize" (
    "size_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderSize_order_id_size_id_key" ON "OrderSize"("order_id", "size_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "category_id" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "model_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OrderSize" ADD CONSTRAINT "order_id" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OrderSize" ADD CONSTRAINT "size_id" FOREIGN KEY ("size_id") REFERENCES "Size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
