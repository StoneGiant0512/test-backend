const { Pool } = require('pg');

const getSSLConfig = () => {
  if (process.env.DB_SSL === 'true' || process.env.DB_SSL === '1') {
    // Render.com PostgreSQL requires this format
    return {
      rejectUnauthorized: false
    };
  }
  return false;
};

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: getSSLConfig(),
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  pool,
};

