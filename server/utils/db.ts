// Create PostgreSQL Connection Pool here !
import "dotenv/config";
import { Pool } from "pg";

const connectionPool = new Pool({
  connectionString: process.env.DB_URL,
});

export default connectionPool;
