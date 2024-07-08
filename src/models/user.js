import { DataTypes } from "sequelize";
import Organisation from "./organisation.js";
import db from "../db/db.js";

const User = db.define(
  "user",
  {
    userId: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      validate: {
        isUUID: 4,
        notEmpty: true,
      },
      //   defaultValue: v4(),
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false }
);

const UserOrganisation = db.define(
  "userorganisation",
  {
    uoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

// Users.prototype.to
User.belongsToMany(Organisation, {
  through: UserOrganisation,
  foreignKey: "userId",
});
Organisation.belongsToMany(User, {
  through: UserOrganisation,
  foreignKey: "orgId",
});
await db.sync();

export default User;
