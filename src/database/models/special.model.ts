import { Schema, model } from "mongoose";

const specialSchema = new Schema(
  {
    orderData: { type: String, required: true },
    customerData: {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    status: { type: String, default: "pending", enum: ["pending", "done"] },
  },
  {
    timestamps: true,
  }
);

const SpecialModel = model("Special", specialSchema);

export default SpecialModel;
