import {Router} from "express"
import * as controllers from "../controllers/order.controller.js"

const routes = Router();

routes.post("/", controllers.createOrder);
routes.get("/", controllers.getAllOrders);
routes.put("/:id", controllers.updateOrderStatus);
routes.delete("/:id", controllers.deleteOrder);

export default routes