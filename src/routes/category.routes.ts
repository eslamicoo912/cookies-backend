import { Router } from "express";
import * as controllers from "../controllers/category.controller.js";

const routes = Router();

routes.post("/", controllers.createCategory);
routes.get("/", controllers.getAllCategories);
routes.get("/:key", controllers.getOneCategory);
routes.put("/:id", controllers.updateCategory);
routes.delete("/:id", controllers.deleteCategory);

export default routes;
