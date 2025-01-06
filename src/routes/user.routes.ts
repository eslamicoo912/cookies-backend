import { Router } from "express";
import * as controllers from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", controllers.getAllUsers);
router.get("/profile", isAuthenticated(), controllers.getMyProfile);
router.put("/:id", controllers.updateUser);

export default router;
