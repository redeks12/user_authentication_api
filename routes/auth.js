import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const router = Router();
router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.createUser);

export default router;
