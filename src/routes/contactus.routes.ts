import { Router } from "express";
import * as controllers from "../controllers/contactus.controller.js";

const routes = Router();

routes.post("/", controllers.createContactus);
routes.get("/", controllers.getAllContactus);
routes.put("/:id", controllers.updateContactus);
routes.delete("/:id", controllers.deleteContactus);

export default routes;
