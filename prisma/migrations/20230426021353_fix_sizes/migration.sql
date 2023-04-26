/*
  Warnings:

  - You are about to drop the column `artistic_description_of_the_model` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `cloth_style_id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `cloth_style_requirements` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `fabric_id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `fabric_requirements` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `node_processing_id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `node_processing_requirements` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `size_id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the `CategoriesOnClothStyle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClothStyle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fabric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NodeProcessing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "cloth_style_id";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "fabric_id";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "node_processing_id";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "size_id";

-- DropForeignKey
ALTER TABLE "CategoriesOnClothStyle" DROP CONSTRAINT "category_id";

-- DropForeignKey
ALTER TABLE "CategoriesOnClothStyle" DROP CONSTRAINT "clothes_style_id";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "artistic_description_of_the_model",
DROP COLUMN "cloth_style_id",
DROP COLUMN "cloth_style_requirements",
DROP COLUMN "fabric_id",
DROP COLUMN "fabric_requirements",
DROP COLUMN "node_processing_id",
DROP COLUMN "node_processing_requirements",
DROP COLUMN "size_id",
ADD COLUMN     "artistic_description" TEXT,
ADD COLUMN     "custom_knot" VARCHAR(1024),
ADD COLUMN     "custom_model" VARCHAR(1024),
ADD COLUMN     "custom_textile" VARCHAR(1024);

-- DropTable
DROP TABLE "CategoriesOnClothStyle";

-- DropTable
DROP TABLE "ClothStyle";

-- DropTable
DROP TABLE "Fabric";

-- DropTable
DROP TABLE "NodeProcessing";

-- CreateTable
CREATE TABLE "CartSize" (
    "size_id" INTEGER NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "CartSize_cart_id_size_id_key" ON "CartSize"("cart_id", "size_id");

-- AddForeignKey
ALTER TABLE "CartSize" ADD CONSTRAINT "cart_id" FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CartSize" ADD CONSTRAINT "size_id" FOREIGN KEY ("size_id") REFERENCES "Size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
