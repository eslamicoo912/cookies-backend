import Joi from "joi";
import { generalFields } from "../middleware/validation.middleware.js";

export const createOrUpdateProductSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    prices: Joi.array().required(),
    category: Joi.string().required(),
  }),
  query: Joi.object({
    id: generalFields._id,
  }),
});
