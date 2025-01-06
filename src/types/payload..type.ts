import { Types } from "mongoose";

export type Payload = {
  id: string;
  email: string;
  name: string;
};

export type PaymentPayload = {
  orderId: string;
  userId: string;
  exp?: Date;
};

export type TokenType = {
  token: string;
};

export type IdType = {
  id: Types.ObjectId;
};
