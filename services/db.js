const { Pool, Client } = require('pg');
const db_url = process.env.DATABASE_URL;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const pool = new Pool({
  connectionString: db_url
});

module.exports = pool;