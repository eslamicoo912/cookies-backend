import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    customerData: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    orderedAt: { type: Date, default: Date.now },
    // cartItems: [
    //   {
    //     product: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Product",
    //       required: true,
    //     },
    //     quantity: { type: Number, required: true },
    //   },
    // ],
    cartItems: [
      {
        cookieName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: Number,
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "canceled", "done"],
    },
  },
  { timestamps: true }
);

const OrderModel = model("Order", orderSchema);

export default OrderModel;
