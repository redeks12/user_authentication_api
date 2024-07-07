import Organisation from "../models/organisation.js";
import User from "../models/user.js";
import { v4 } from "uuid";

class OrganisationController {
  // Get all Organisation
  static async getAllOrganisation(req, res) {
    try {
      const user_id = req.userData.userId;
      const user = await User.findByPk(user_id);

      const orgs = await user.getOrganisations();

      let pack = [];
      for (let i of orgs) {
        // eslint-disable-next-line no-unused-vars
        const { userorganisation, ...rest } = i.toJSON();
        pack.push(rest);
      }
      const val = {
        status: "success",
        message: "successfully retrieved organisations",
        data: {
          organisations: pack,
        },
      };
      res.status(200).json(val);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      res.status(404).json({
        status: "Bad request",
        message: "failed to get organisations",
        statusCode: 404,
      });
    }
  }

  // Get a organisation by ID
  static async getOrganisationById(req, res) {
    try {
      const organisation = await Organisation.findByPk(req.params.orgId);
      if (!organisation) {
        throw new Error("Organisation not found");
      }

      const val = {
        status: "success",
        message: "successfully found organisation",
        data: {
          ...organisation.toJSON(),
        },
      };
      res.status(200).json(val);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      res.status(404).json({
        status: "Bad Request",
        message: "Not Found",
        statusCode: 404,
      });
    }
  }

  // Create a new organisation
  static async createOrganisation(req, res) {
    try {
      const neworganisation = await Organisation.create({
        orgId: v4(),
        ...req.body,
      });
      const user = await User.findByPk(req.userData.userId);
      await user.addOrganisations(neworganisation);

      const val = {
        status: "success",
        message: "Organisation created successfully",
        data: neworganisation.toJSON(),
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
      res.status(400).json({
        status: "Bad Request",
        message: "Client error",
        statusCode: 400,
      });
    }
  }

  static async addUserOrg(req, res) {
    try {
      const org = await Organisation.findByPk(req.params.orgId);
      if (!org) {
        throw new Error("Organisation not found");
      }
      const user = await User.findByPk(req.body.userId);
      if (!user) {
        throw new Error(`User not found`);
      }
      await user.addOrganisations(org);
      res.status(200).json({
        status: "success",
        message: "User added to organisation successfully",
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      res.status(404).json({
        status: "Bad Request",
        message: "Not Found",
        statusCode: 404,
      });
    }
  }
}

export default OrganisationController;
