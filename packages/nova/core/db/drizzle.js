import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

export function createDatabase({ url }) {
  const pool = new pg.Pool({ connectionString: url });
  return drizzle(pool);
}
