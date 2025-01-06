import { Router } from "express";
import * as controllers from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { validationCoreFunction } from "../middleware/validation.middleware.js";
import { loginSchema, signupSchema } from "../validations/auth.validation.js";

const router = Router();

router.post(
  "/login",
  validationCoreFunction(loginSchema),
  controllers.loginUser
);
router.post("/admin/login", controllers.loginAdmin);
router.post(
  "/signup",
  validationCoreFunction(signupSchema),
  controllers.signup
);
router.post("/logout", isAuthenticated(), controllers.logoutUser);

export default router;
