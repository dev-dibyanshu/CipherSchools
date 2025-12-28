const { Pool } = require('pg');

let pool;

const connectPostgres = () => {
  pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  pool.on('connect', () => {
    console.log('🐘 PostgreSQL client connected');
  });

  pool.on('error', (err) => {
    console.error('❌ PostgreSQL client error:', err);
  });

  // Test the connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('❌ PostgreSQL connection test failed:', err);
    } else {
      console.log('✅ PostgreSQL connection test successful');
    }
  });
};

const getPool = () => {
  if (!pool) {
    throw new Error('PostgreSQL pool not initialized');
  }
  return pool;
};

module.exports = { connectPostgres, getPool };