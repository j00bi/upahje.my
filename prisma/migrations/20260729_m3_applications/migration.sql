-- Reconcile the Application table from the initial migration with the Prisma
-- schema and enforce the invariants required by the M3 hiring loop.

DO $$
BEGIN
  CREATE TYPE "ApplicationStatus" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'WITHDRAWN'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

ALTER TABLE "Application"
  ALTER COLUMN "status" DROP DEFAULT,
  ALTER COLUMN "status" TYPE "ApplicationStatus"
    USING UPPER("status")::"ApplicationStatus",
  ALTER COLUMN "status" SET DEFAULT 'PENDING';

CREATE UNIQUE INDEX IF NOT EXISTS
  "Application_jobId_applicantId_key"
  ON "Application"("jobId", "applicantId");

DO $$
BEGIN
  ALTER TABLE "Application"
    ADD CONSTRAINT "Application_applicantId_fkey"
    FOREIGN KEY ("applicantId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;
