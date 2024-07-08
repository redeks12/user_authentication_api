import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

let db;
console.log(process.env.DB_ADDR);
if (process.env.DB_ADDR) {
  db = new Sequelize(process.env.DB_ADDR, {
    dialect: "postgres",
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
