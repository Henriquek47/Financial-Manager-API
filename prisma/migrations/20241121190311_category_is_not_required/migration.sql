-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_category_id_fkey`;

-- AlterTable
ALTER TABLE `transaction` MODIFY `category_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
