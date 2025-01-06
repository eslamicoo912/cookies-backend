import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import orderRouter from "./order.routes.js";
import productRouter from "./product.routes.js";
import categoryRouter from "./category.routes.js";
import contactusRouter from "./contactus.routes.js";
import specialsRouter from "./special.routes.js";

const appRouter = () => {
  const router = Router();

  router.use("/auth", authRouter);
  router.use("/user", userRouter);
  router.use("/order", orderRouter);
  router.use("/product", productRouter);
  router.use("/category", categoryRouter);
  router.use("/contactus", contactusRouter);
  router.use("/special", specialsRouter);

  return router;
};

export default appRouter;
