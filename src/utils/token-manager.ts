import jwt from "jsonwebtoken";
import { Response } from "express";
import { Payload, PaymentPayload } from "../types/payload..type.js";
import { NextFunction } from "express";

export const createToken = (
  id: string,
  email: string,
  name: string,
  expiresIn: string,
  _res: Response
) => {
  const payload: Payload = { id, email, name };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken = (token: string, next?: NextFunction) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as Payload;
  } catch (error) {
    return next(new Error("this token is expired", { cause: 401 }));
  }
};

export const createPaymentToken = (orderId: string, userId: string) => {
  const payload: PaymentPayload = { orderId, userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const verifyPaymentToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET) as PaymentPayload;
};
