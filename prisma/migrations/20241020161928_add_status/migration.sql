/*
  Warnings:

  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'SUCCESS', 'CANCEL', 'PROCESS');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userId",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
