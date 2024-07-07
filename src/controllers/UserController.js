import Users from "../models/user.js";

class UserController {
  // Get a user by ID
  static async getUserById(req, res) {
    try {
      const user = await Users.findByPk(req.params.id);

      if (!user) {
        throw new Error("User not found");
      }
      // eslint-disable-next-line no-unused-vars
      const { password, ...rest } = user.toJSON();
      const val = {
        status: "success",
        message: "user retrieved successfully",
        data: rest,
      };
      res.status(200).json(val);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      res.status(404).json({
        status: "Bad request",
        message: "error retrieving user",
        statusCode: 401,
      });
    }
  }
}

export default UserController;
