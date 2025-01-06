import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "User", enum: ["User", "Admin"] },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
    tokens: [String],
  },
  {
    timestamps: true,
  }
);
const UserModel = model("User", userSchema);

export default UserModel;
