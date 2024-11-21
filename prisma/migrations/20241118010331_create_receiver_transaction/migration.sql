/*
  Warnings:

  - Added the required column `receiver_id` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `receiver_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
