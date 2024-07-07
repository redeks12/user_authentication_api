import { Router } from "express";
import OrganisationController from "../controllers/OrganisationController.js";
import authenticate from "../middleware/auth.js";

const router = Router();

// Define your routes
router.get("/", authenticate, OrganisationController.getAllOrganisation);
router.get("/:orgId", authenticate, OrganisationController.getOrganisationById);
router.post("/", authenticate, OrganisationController.createOrganisation);
router.post("/:orgId/users", authenticate, OrganisationController.addUserOrg);

export default router;
