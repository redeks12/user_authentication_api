import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import process from "process";
dotenv.config();
const db = new Sequelize(process.env.DB_ADDR, { logging: false });

export default db;
