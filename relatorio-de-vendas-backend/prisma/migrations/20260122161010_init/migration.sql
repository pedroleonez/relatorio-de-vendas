-- CreateTable
CREATE TABLE `Venda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produto` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `valorTotal` DECIMAL(65, 30) NOT NULL,
    `dataVenda` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
