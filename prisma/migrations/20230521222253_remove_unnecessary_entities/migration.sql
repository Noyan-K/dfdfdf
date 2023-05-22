/*
  Warnings:

  - You are about to drop the column `contact_id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `language_id` on the `Description` table. All the data in the column will be lost.
  - You are about to drop the column `vendor_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `vendor_partnumber` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `currency_id` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `currency_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Currency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CurrencyRate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModelProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupplierProductPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_contact_id_fkey";

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
ALTER TABLE "Product" DROP CONSTRAINT "product_vendor_id_fk";

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

-- DropIndex
DROP INDEX "Cart_id_contact_id_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "contact_id";

-- AlterTable
ALTER TABLE "Description" DROP COLUMN "language_id";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "vendor_id",
DROP COLUMN "vendor_partnumber";

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "currency_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "currency_id";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Currency";

-- DropTable
DROP TABLE "CurrencyRate";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "Model";

-- DropTable
DROP TABLE "ModelProduct";

-- DropTable
DROP TABLE "SupplierProductPrice";

-- DropTable
DROP TABLE "Vendor";
