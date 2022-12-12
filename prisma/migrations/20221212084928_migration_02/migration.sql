/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "roomid" INTEGER,
    "personid" INTEGER,
    "from" DATETIME NOT NULL,
    "until" DATETIME NOT NULL,
    "comment" TEXT,
    CONSTRAINT "Booking_roomid_fkey" FOREIGN KEY ("roomid") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Booking_personid_fkey" FOREIGN KEY ("personid") REFERENCES "Person" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("comment", "createdAt", "from", "id", "personid", "roomid", "until", "updatedAt") SELECT "comment", "createdAt", "from", "id", "personid", "roomid", "until", "updatedAt" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_title_key" ON "Booking"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");
