const { Pool } = require('pg')
const DB = require('../../config')

const pool = new Pool({
    host: DB.PGHOST,
    port: DB.PGPORT,
    database: DB.PGDATABASE,
    user: DB.PGUSER,
    password: DB.PGPASSWORD,
    max: 5,
    connectionTimeoutMillis: 20000,
    idleTimeoutMillis: 20000,
    allowExitOnIdle: false
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}