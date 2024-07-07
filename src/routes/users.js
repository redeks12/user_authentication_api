import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authenticate from "../middleware/auth.js";

const router = Router();

// Define your routes
router.get("/:id", authenticate, UserController.getUserById);

export default router;
