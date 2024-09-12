/*
  Warnings:

  - Added the required column `isBooked` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `isBooked` BOOLEAN NOT NULL;
