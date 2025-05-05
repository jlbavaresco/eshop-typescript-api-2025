import { Pool } from 'pg';

const isProduction: boolean = process.env.NODE_ENV === 'production';

let pool: Pool;

if (isProduction) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: {
      rejectUnauthorized: false,
    }
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL!
  });
}

export { pool };