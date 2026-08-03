import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
try {
  const pols = await p.$queryRawUnsafe(`SELECT tablename, policyname, cmd FROM pg_policies WHERE schemaname='public' ORDER BY tablename, policyname;`);
  for (const pol of pols) console.log(`${pol.tablename}: ${pol.policyname} [${pol.cmd}]`);
} catch(e){ console.error("ERR", e.message); }
await p.$disconnect();
