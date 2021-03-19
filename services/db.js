const { Pool, Client } = require('pg');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const connectionString = DATABASE_URL;
const pool = new Pool({
  connectionString,
});

module.exports = pool;