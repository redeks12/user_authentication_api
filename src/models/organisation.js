import { DataTypes } from "sequelize";
import db from "../db/db.js";

const Organisation = db.define(
  "organisation",
  {
    orgId: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      validate: {
        isUUID: 4,
        notEmpty: true,
      },
      //   defaultValue: v4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

// Users.prototype.to

await db.sync();

export default Organisation;
