/*
  Warnings:

  - A unique constraint covering the columns `[cor]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cor` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `cor` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `category_cor_key` ON `category`(`cor`);
