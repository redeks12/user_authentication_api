import Users from "../models/user.js";
import Organisation from "../models/organisation.js";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import tok from "../utilities/tokens.js";
const { generateToken } = tok;

class AuthController {
  // Create a new user
  static async createUser(req, res) {
    try {
      // conts password = req.body.pop()
      // Hash the password
      if (!req.body.password) {
        throw new Error("SequelizeValidationError");
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await Users.create({
        userId: v4(),
        ...req.body,
        password: hashedPassword,
      });
      const orgName = `${req.body.firstName}'s organisation`;
      const org = await Organisation.create({ orgId: v4(), name: orgName });

      await newUser.addOrganisations(org);

      const token = generateToken({
        email: newUser.email,
        userId: newUser.userId,
      });
      // eslint-disable-next-line no-unused-vars
      const { password, ...rest } = newUser.toJSON();
      // nu.pop()
      const val = {
        status: "success",
        message: "Registration successful",
        data: {
          accessToken: token,
          user: rest,
        },
      };
      res.status(201).json(val);
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        }));
        return res.status(422).json({
          errors,
        });
      }
      const val = {
        status: "Bad request",
        message: "Registration unsuccessful",
        statusCode: 400,
      };
      res.status(400).json(val);
    }
  }
  static async loginUser(req, res) {
    try {
      const user = await Users.findOne({ where: { email: req.body.email } });
      if (!user) {
        throw new Error("user not found");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        throw new Error("Invalid password");
      }
      // eslint-disable-next-line no-unused-vars
      const { password, ...rest } = user.toJSON();
      const token = generateToken({ email: user.email, userId: user.userId });
      const val = {
        status: "success",
        message: "Login successful",
        data: {
          accessToken: token,
          user: rest,
        },
      };
      res.status(200).json(val);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      res.status(401).json({
        status: "Bad request",
        message: "Authentication failed",
        statusCode: 401,
      });
    }
  }
}

export default AuthController;
