/*
  Warnings:

  - You are about to drop the column `clinicId` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `specialtyId` on the `doctor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `doctor` DROP FOREIGN KEY `Doctor_clinicId_fkey`;

-- DropForeignKey
ALTER TABLE `doctor` DROP FOREIGN KEY `Doctor_provinceId_fkey`;

-- DropForeignKey
ALTER TABLE `doctor` DROP FOREIGN KEY `Doctor_specialtyId_fkey`;

-- AlterTable
ALTER TABLE `doctor` DROP COLUMN `clinicId`,
    DROP COLUMN `provinceId`,
    DROP COLUMN `specialtyId`;
