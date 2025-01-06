import UserModel from "../database/models/user.model.js";
import { UserType } from "../types/auth.types.js";
import { asyncHandeller } from "../utils/errorHandling.js";
import { Request, Response } from "express";
import paginationFunction from "../utils/pagination.js";

export const getAllUsers = asyncHandeller(
  async (req: Request, res: Response) => {
    const { limit, skip } = paginationFunction(req.query);
    const users: UserType[] | null = (await UserModel.find()
      .limit(limit)
      .skip(skip)
      .lean()) as unknown as UserType[];
    if (!users.length)
      return res.status(404).json({ message: "No users found" });
    return res.status(200).json({ message: "success", data: users });
  }
);

export const getMyProfile = asyncHandeller(
  async (req: Request, res: Response) => {
    const { user } = req;
    if (!user)
      return res
        .status(404)
        .json({ message: "Make sure user is authenticated" });
    const userProfile = await UserModel.findById(user._id).select(
      "-password -tokens -OTP -isConfirmEmail -paymentToken"
    );
    return res.status(200).json({ message: "success", data: userProfile });
  }
);

export const updateUser = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ message: "User updated", data: updatedUser });
  }
);
