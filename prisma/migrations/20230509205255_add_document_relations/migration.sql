/*
  Warnings:

  - You are about to drop the column `document_id` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "document_id";

-- CreateTable
CREATE TABLE "ProductDocument" (
    "product_id" INTEGER NOT NULL,
    "document_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ProductDocument_pkey" PRIMARY KEY ("product_id","document_id")
);

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "model_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductDocument" ADD CONSTRAINT "model_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductDocument" ADD CONSTRAINT "model_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "model_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CategoryDocument" ADD CONSTRAINT "model_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "model_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
