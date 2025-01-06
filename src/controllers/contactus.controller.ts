import ContactusModel from "../database/models/contactus.model.js";
import { asyncHandeller } from "../utils/errorHandling.js";
import { Request, Response } from "express";

export const createContactus = asyncHandeller(
  async (req: Request, res: Response) => {
    const { name, phone, additionalInfo } = req.body;
    if (!name || !phone || !additionalInfo)
      return res.status(400).json({ message: "All fields are required" });
    const foundContactus = await ContactusModel.findOne({
      $or: [{ name }, { phone }],
    });
    if (foundContactus)
      return res.status(400).json({ message: "Contactus already exists" });
    const contactus = await ContactusModel.create({
      name,
      phone,
      additionalInfo,
    });
    return res.status(200).json({ message: "Message sent", data: contactus });
  }
);

export const getAllContactus = asyncHandeller(
  async (req: Request, res: Response) => {
    const contactus = await ContactusModel.find();
    return res.status(200).json({ message: "success", data: contactus });
  }
);

export const updateContactus = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedContactus = await ContactusModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Contactus updated", data: updatedContactus });
  }
);

export const deleteContactus = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedContactus = await ContactusModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Contactus deleted", data: deletedContactus });
  }
);
