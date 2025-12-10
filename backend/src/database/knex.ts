import knex from "knex";
import * as path from "path";

const dbPath = path.resolve(__dirname, "../data/taxi-wagner.sqlite");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

export default db;
