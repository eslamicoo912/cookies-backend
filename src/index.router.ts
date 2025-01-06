import cors from "cors";
import connectDB from "./database/connection.js";
import appRouter from "./routes/index.js";
import { glopalErrorHandelling } from "./utils/errorHandlig.js";
import path from "path";
import bodyParser from "body-parser";

const bootstrap = (app: any, express: any) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/uploads", express.static(path.join("uploads")));
  app.use("/api/v1", appRouter());
  app.use("/", (_req: any, res: any) => {
    return res.status(404).json({ message: "hello world" });
  });
  app.use("*", (_req: any, res: any) => {
    return res.status(404).json({ error: "not found" });
  });
  app.use(glopalErrorHandelling);
  connectDB();
};

export default bootstrap;
