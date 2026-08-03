import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
try {
  const migs = await p.$queryRawUnsafe(`SELECT migration_name, applied_steps_count, finished_at IS NOT NULL AS finished FROM "_prisma_migrations" ORDER BY started_at;`);
  console.log("## _prisma_migrations");
  for (const m of migs) console.log(`  ${m.migration_name} (steps=${m.applied_steps_count}, finished=${m.finished})`);
  const app = await p.$queryRawUnsafe(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='Application' ORDER BY ordinal_position;`);
  console.log("\n## Application columns");
  for (const c of app) console.log(`  ${c.column_name}: ${c.data_type}`);
  const enums = await p.$queryRawUnsafe(`SELECT typname FROM pg_type WHERE typname IN ('KYCStatus','ApplicationStatus');`);
  console.log("\n## M3 enums:", enums.map(e=>e.typname).join(", "));
  const kyc = await p.$queryRawUnsafe(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='Profile' AND column_name IN ('kycStatus','kycFileUrl') ORDER BY column_name;`);
  console.log("## Profile KYC cols:", kyc.map(c=>`${c.column_name}:${c.data_type}`).join(", "));
} catch(e){ console.error("ERR", e.message); }
await p.$disconnect();
