import { Response, NextFunction, Request } from "express";
import { asyncHandeller } from "../utils/errorHandlig.js";
import { verifyToken } from "../utils/token-manager.js";
import UserModel from "../database/models/user.model.js";
import { Payload } from "../types/payload..type.js";

export const isAuthenticated = () => {
  return asyncHandeller(
    async (req: Request, _res: Response, next: NextFunction) => {
      const { authorization } = req.headers;
      if (!authorization)
        return next(new Error("Please login first!", { cause: 401 }));

      const token = authorization.split(" ")[1];
      if (!token)
        return next(
          new Error(
            "No token splitted, make sure you provided a bearer token",
            {
              cause: 401,
            }
          )
        );
      const decoded: Payload = verifyToken(token, next);
      if (!decoded) {
        return next(new Error("Invalid or expired token", { cause: 401 }));
      }
      const user = await UserModel.findOne({
        _id: decoded.id,
        tokens: { $in: [token] },
      });
      if (!user) return next(new Error("No user found", { cause: 404 }));
      req.token = token;
      req.user = user;
      next();
    }
  );
};
