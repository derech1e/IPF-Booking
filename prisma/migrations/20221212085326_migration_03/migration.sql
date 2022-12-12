/*
  Warnings:

  - Added the required column `firstname` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL
);
INSERT INTO "new_Person" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Person" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
