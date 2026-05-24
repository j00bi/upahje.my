CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');

ALTER TABLE "Application" RENAME COLUMN "applicantId" TO "talentId";
ALTER TABLE "Application" RENAME COLUMN "message" TO "proposal";

UPDATE "Application" SET "proposal" = '' WHERE "proposal" IS NULL;

ALTER TABLE "Application"
  ADD COLUMN "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "reviewedAt" TIMESTAMP(3),
  ADD COLUMN "respondedAt" TIMESTAMP(3);

ALTER TABLE "Application"
  ALTER COLUMN "proposal" SET NOT NULL,
  ALTER COLUMN "status" DROP DEFAULT,
  ALTER COLUMN "status" TYPE "ApplicationStatus" USING "status"::"ApplicationStatus",
  ALTER COLUMN "status" SET DEFAULT 'PENDING';

CREATE UNIQUE INDEX "Application_jobId_talentId_key" ON "Application"("jobId", "talentId");

ALTER TABLE "Application"
  ADD CONSTRAINT "Application_talentId_fkey"
  FOREIGN KEY ("talentId") REFERENCES "Talent"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
