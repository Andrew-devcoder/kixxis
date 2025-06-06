-- DropForeignKey
ALTER TABLE "Cocktail" DROP CONSTRAINT "Cocktail_categoryId_fkey";

-- AlterTable
ALTER TABLE "Cocktail" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cocktail" ADD CONSTRAINT "Cocktail_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
