-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_receiver_id_fkey`;

-- AlterTable
ALTER TABLE `transaction` MODIFY `receiver_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
