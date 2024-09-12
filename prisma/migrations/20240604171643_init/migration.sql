/*
  Warnings:

  - You are about to drop the column `districtId` on the `clinic` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `clinic` table. All the data in the column will be lost.
  - Added the required column `clinicId` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clinic` DROP FOREIGN KEY `Clinic_districtId_fkey`;

-- DropForeignKey
ALTER TABLE `clinic` DROP FOREIGN KEY `Clinic_provinceId_fkey`;

-- AlterTable
ALTER TABLE `clinic` DROP COLUMN `districtId`,
    DROP COLUMN `provinceId`;

-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `clinicId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
