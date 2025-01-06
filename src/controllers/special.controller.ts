import SpecialModel from "../database/models/special.model.js";
import { asyncHandeller } from "../utils/errorHandling.js";
import { Request, Response } from "express";

export const createSpecial = asyncHandeller(
  async (req: Request, res: Response) => {
    const newSpecial = await SpecialModel.create(req.body);
    return res
      .status(200)
      .json({ message: "Special order created", data: newSpecial });
  }
);

export const getAllSpecials = asyncHandeller(
  async (req: Request, res: Response) => {
    const specials = await SpecialModel.find();
    return res.status(200).json({ message: "success", data: specials });
  }
);

export const updateSpecial = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const updatedSpecial = await SpecialModel.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Special order updated", data: updatedSpecial });
  }
);

export const deleteSpecial = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedSpecial = await SpecialModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Special order deleted", data: deletedSpecial });
  }
);
