/*
  Warnings:

  - You are about to drop the column `name` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,contact_id]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cloth_sex` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cloth_style_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fabric_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `node_processing_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size_id` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserTypeEnum" AS ENUM ('USER', 'GUEST');

-- CreateEnum
CREATE TYPE "ClothSexEnum" AS ENUM ('MALE', 'FEMALE', 'UNISEX');

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- DropIndex
DROP INDEX "Cart_id_user_id_type_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "name",
DROP COLUMN "type",
DROP COLUMN "user_id",
ADD COLUMN     "additional_materials" TEXT,
ADD COLUMN     "artistic_description_of_the_model" TEXT,
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "cloth_sex" "ClothSexEnum" NOT NULL,
ADD COLUMN     "cloth_style_id" INTEGER NOT NULL,
ADD COLUMN     "cloth_style_requirements" TEXT,
ADD COLUMN     "contact_id" INTEGER NOT NULL,
ADD COLUMN     "custom_size" VARCHAR(1024),
ADD COLUMN     "fabric_id" INTEGER NOT NULL,
ADD COLUMN     "fabric_requirements" TEXT,
ADD COLUMN     "node_processing_id" INTEGER NOT NULL,
ADD COLUMN     "node_processing_requirements" TEXT,
ADD COLUMN     "size_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT,
ADD COLUMN     "document_id" INTEGER,
ADD COLUMN     "sex" "ClothSexEnum";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserTypeEnum" NOT NULL DEFAULT 'USER',
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "contact_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "json" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothStyle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ClothStyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnClothStyle" (
    "category_id" INTEGER NOT NULL,
    "clothes_style_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "CategoriesOnClothStyle_pkey" PRIMARY KEY ("category_id","clothes_style_id")
);

-- CreateTable
CREATE TABLE "NodeProcessing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "NodeProcessing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fabric" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Fabric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_id_uindex" ON "Contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_email_uindex" ON "Contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClothStyle_name_key" ON "ClothStyle"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NodeProcessing_name_key" ON "NodeProcessing"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Fabric_name_key" ON "Fabric"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_id_contact_id_key" ON "Cart"("id", "contact_id");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "category_id" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "size_id" FOREIGN KEY ("size_id") REFERENCES "Size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "cloth_style_id" FOREIGN KEY ("cloth_style_id") REFERENCES "ClothStyle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "node_processing_id" FOREIGN KEY ("node_processing_id") REFERENCES "NodeProcessing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "fabric_id" FOREIGN KEY ("fabric_id") REFERENCES "Fabric"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CategoriesOnClothStyle" ADD CONSTRAINT "category_id" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CategoriesOnClothStyle" ADD CONSTRAINT "clothes_style_id" FOREIGN KEY ("clothes_style_id") REFERENCES "ClothStyle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
