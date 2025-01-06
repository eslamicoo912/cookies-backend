import Joi from "joi";
import { generalFields } from "../middleware/validation.middleware.js";

export const createOrderSchema = Joi.object({
  cartItems: Joi.array().required(),
  customerData: Joi.object({
    name: generalFields.name,
    email: generalFields.email,
    phoneNumber: generalFields.phoneNumber,
  }).required(),
});

export const updatedOrderSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().required(),
  }),
  query: Joi.object({
    id: generalFields._id,
  }),
});
