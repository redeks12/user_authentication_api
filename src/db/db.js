import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

let db;
if (process.env.DB_ADDR) {
  db = new Sequelize(process.env.DB_ADDR, {
    dialect: "postgres",
    logging: false
  });
} else {
  db = new Sequelize({
    dialect: "sqlite",
    storage: "./database.db",
    logging: false,
  });
}
// db = new Sequelize(process.env.DB_ADDR, { logging: false });

export default db;
