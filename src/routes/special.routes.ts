import { Router } from "express";
import * as controllers from "../controllers/special.controller.js";

const routes = Router();

routes.post("/", controllers.createSpecial);
routes.get("/", controllers.getAllSpecials);
routes.put("/:id", controllers.updateSpecial);
routes.delete("/:id", controllers.deleteSpecial);

export default routes;
