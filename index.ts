import express from "express";
import bootstrap from "./src/index.router.js";
import dotenv from "dotenv";
import http from "http";

dotenv.config();
const app = express();
const port: number = parseInt(process.env.PORT as string) || 3000;
const server = http.createServer(app);
bootstrap(app, express);
server.listen(port, () => {
  console.log(`Listening on port ....  ${port}`);
});
