-- AlterTable
ALTER TABLE `clinic` MODIFY `image` LONGBLOB NOT NULL,
    MODIFY `contentHTML` LONGTEXT NOT NULL,
    MODIFY `contentMarkdown` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `specialty` MODIFY `image` LONGBLOB NOT NULL,
    MODIFY `contentHTML` LONGTEXT NOT NULL,
    MODIFY `contentMarkdown` LONGTEXT NOT NULL;
