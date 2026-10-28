-- This is an empty migration.

UPDATE "User" SET "updatedAt" = COALESCE("updatedAt", CURRENT_TIMESTAMP);

ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;