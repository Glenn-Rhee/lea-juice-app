/*
  Warnings:

  - You are about to drop the column `payment_method` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `Order` table. All the data in the column will be lost.
  - Added the required column `payment_method` to the `Detail_Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Detail_Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Detail_Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Detail_Order" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "payment_method" TEXT NOT NULL,
ADD COLUMN     "status" "STATUSORDER" NOT NULL,
ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "payment_method",
DROP COLUMN "status",
DROP COLUMN "total_price";
