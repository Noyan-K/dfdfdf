-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_contact_id_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "category_id" DROP NOT NULL,
ALTER COLUMN "contact_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
