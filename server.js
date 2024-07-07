import express from "express";
import cors from "cors";
import db from "./db/db.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import Users from "./routes/users.js";
import Organisations from "./routes/organisations.js";
import Auth from "./routes/auth.js";
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use("/auth", Auth);
app.use("/api/users", Users);
app.use("/api/organisations", Organisations);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
