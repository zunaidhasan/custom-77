import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Lazily-initialized Postgres pool + Drizzle client.
 *
 * Next.js imports every route module during `next build` ("collecting page
 * data"), even for API routes that only run at request time. Creating the pool
 * or throwing on a missing DATABASE_URL at import time would therefore fail
 * builds in environments where the env var isn't exposed to the build step
 * (e.g. Vercel). Instead, everything is resolved on first actual use, which
 * only happens at request time where DATABASE_URL exists.
 */
const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlDb?: NodePgDatabase;
};

function createPool(): Pool {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required (set it in .env.local for local dev, or in Vercel > Project Settings > Environment Variables)."
    );
  }

  return new Pool({ connectionString: databaseUrl });
}

export function getPool(): Pool {
  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    globalForDb.__arenaNextJsPostgresqlPool = createPool();
  }
  return globalForDb.__arenaNextJsPostgresqlPool;
}

function getDrizzle(): NodePgDatabase {
  if (!globalForDb.__arenaNextJsPostgresqlDb) {
    globalForDb.__arenaNextJsPostgresqlDb = drizzle(getPool());
  }
  return globalForDb.__arenaNextJsPostgresqlDb;
}

/**
 * Drop-in replacement for the Drizzle client. Property access is proxied so
 * nothing is constructed until the first real query at request time.
 */
export const db = new Proxy({} as NodePgDatabase, {
  get(_target, prop, receiver) {
    return Reflect.get(getDrizzle(), prop, receiver);
  },
});
