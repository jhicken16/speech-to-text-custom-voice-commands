const { Client } = require('pg');
const { DB } = require('./config');

(async () => {

  const usersTableStmt = `
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(50) NOT NULL
    );
  `

  const commandsTableStmt = `
    CREATE table commands (
      id serial primary key,
      user_id INT,
      command_data JSON,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT
    });

    await db.connect();

    // Create tables on database
    await db.query(usersTableStmt);
    await db.query(commandsTableStmt);

    await db.end();

  } catch(err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }

})();