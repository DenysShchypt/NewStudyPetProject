/*
  Warnings:

  - Changed the type of `assetId` on the `WatchList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WatchList" DROP COLUMN "assetId",
ADD COLUMN     "assetId" INTEGER NOT NULL;
