import { Schema, model } from "mongoose";

const contactusSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  additionalInfo: { type: String, required: true },
  isRead: { type: Boolean, default: false },
});

const ContactusModel = model("Contactus", contactusSchema);

export default ContactusModel;
