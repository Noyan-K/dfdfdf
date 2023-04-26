/*
  Warnings:

  - You are about to alter the column `additional_materials` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1024)`.
  - You are about to alter the column `artistic_description` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1024)`.

*/
-- CreateEnum
CREATE TYPE "MannequinPositionEnum" AS ENUM ('UP', 'DOWN', 'FULL');

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "additional_materials" SET DATA TYPE VARCHAR(1024),
ALTER COLUMN "artistic_description" SET DATA TYPE VARCHAR(1024);

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "mannequin" "MannequinPositionEnum";
