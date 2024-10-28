/*
  Warnings:

  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderTopping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderTopping" DROP CONSTRAINT "OrderTopping_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderTopping" DROP CONSTRAINT "OrderTopping_topping_id_fkey";

-- DropTable
DROP TABLE "OrderProduct";

-- DropTable
DROP TABLE "OrderTopping";
