import joi from "joi";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
const validationObjectId = (value: any, helper: any) => {
  return Types.ObjectId.isValid(value) ? true : helper.message("invalid id");
};

export const validationCoreFunction = (schema: any) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const reqMethods = ["body", "headers", "query", "params", "file", "files"];
    const validationErrors = [];
    for (const key of reqMethods) {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationErrors.push(validationResult.error.details);
        }
      }
    }
    if (validationErrors.length) {
      req.validationErrors = validationErrors;
      return next(new Error("", { cause: 400 }));
    }
    next();
  };
};

export const generalFields = {
  _id: joi.string().custom(validationObjectId),
  name: joi.string().min(4).max(100).messages({
    "any.required": "Name is required",
    "string.min": "Name must be at least 4 characters",
    "string.max": "Name must be at most 100 characters",
    "string.base": "Name must be a string",
  }),
  email: joi
    .string()
    .email({ tlds: { allow: ["com"] } })
    .messages({
      "any.required": "Email is required",
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email",
    }),
  password: joi
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/)
    .messages({
      "any.required": "Password is required",
      "string.base": "Password must be a string",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
  OTP: joi.string().min(4),
  phoneNumber: joi
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .messages({
      "any.required": "Phone number is required",
      "string.base": "Phone number must be a string",
      "string.pattern.base": "Phone number must be a valid phone number",
    }),
};
