/*
  Warnings:

  - A unique constraint covering the columns `[product_id,type,mannequin_sex]` on the table `ProductDocument` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MannequinSexEnum" AS ENUM ('MALE', 'FEMALE');

-- DropIndex
DROP INDEX "ProductDocument_product_id_type_key";

-- AlterTable
ALTER TABLE "ProductDocument" ADD COLUMN     "mannequin_sex" "MannequinSexEnum" NOT NULL DEFAULT 'MALE';

-- CreateIndex
CREATE UNIQUE INDEX "ProductDocument_product_id_type_mannequin_sex_key" ON "ProductDocument"("product_id", "type", "mannequin_sex");
