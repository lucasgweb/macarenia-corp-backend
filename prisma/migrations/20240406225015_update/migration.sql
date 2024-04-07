/*
  Warnings:

  - A unique constraint covering the columns `[documentNumber]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentNumber` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentType` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "documentNumber" TEXT NOT NULL,
ADD COLUMN     "documentType" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Person_documentNumber_key" ON "Person"("documentNumber");
