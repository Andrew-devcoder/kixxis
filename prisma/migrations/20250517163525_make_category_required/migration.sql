/*
  Warnings:

  - Made the column `categoryId` on table `Cocktail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cocktail" DROP CONSTRAINT "Cocktail_categoryId_fkey";

-- AlterTable
ALTER TABLE "Cocktail" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Cocktail" ADD CONSTRAINT "Cocktail_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
