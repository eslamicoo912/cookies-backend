import { Router } from "express";
import * as controllers from "../controllers/product.controller.js";
import { multerFunction } from "../middleware/multer.middleware.js";

const routes = Router();

routes.post("/",  multerFunction(), controllers.createProcuct);
routes.get("/", controllers.getAllProducts);
routes.get("/:id", controllers.getProductById);
routes.put("/:id", controllers.updateProduct);
routes.delete("/:id", controllers.deleteProduct);

export default routes;
