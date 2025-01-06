import Joi from "joi";
import { generalFields } from "../middleware/validation.middleware.js";

export const loginSchema = {
  body: Joi.object({
    email: generalFields.email,
    password: generalFields.password,
  }).required(),
};

export const signupSchema = {
  body: Joi.object({
    name: generalFields.name,
    email: generalFields.email,
    phoneNumber: generalFields.phoneNumber,
    password: generalFields.password,
    confirmPassword: Joi.string().equal(Joi.ref("password")).required(),
  }).required(),
};
