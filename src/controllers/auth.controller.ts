import UserModel from "../database/models/user.model.js";
import { LoginType, UserType } from "../types/auth.types.js";
import { asyncHandeller } from "../utils/errorHandling.js";
import { Request, Response, NextFunction } from "express";
import { compareSync, hashSync } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import jwt from "jsonwebtoken";

export const signup = asyncHandeller(async (req: Request, res: Response) => {
  const { name, email, password, phoneNumber } = req.body;

  const user: UserType | null = await UserModel.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword: string = hashSync(password, 10);

  const newUser = await UserModel.create({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
  });

  const token: string = createToken(
    newUser._id.toString(),
    newUser.email,
    newUser.name,
    "7d",
    res
  );
  newUser.tokens.push(token);

  await newUser.save();

  return res.status(200).json({ message: "User created", data: token });
});

export const loginUser = asyncHandeller(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginType = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return next(new Error("This user does not exist", { cause: 404 }));

    console.log("password", password);

    const isPasswordValid: boolean = compareSync(password, user.password);
    if (!isPasswordValid) {
      return next(new Error("Wrong password", { cause: 400 }));
    }
    const token: string = createToken(
      user._id.toString(),
      user.email,
      user.name,
      "7d",
      res
    );
    user.tokens.push(token);

    await user.save();
    return res.status(200).json({ message: "Login successful", data: token });
  }
);

export const logoutUser = asyncHandeller(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const newTokens = user.tokens.filter(
      (token: string) => token !== req.token
    );
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { tokens: newTokens },
      { new: true }
    );
    if (!updatedUser)
      return next(new Error("This user does not exist", { cause: 404 }));
    return res.status(200).json({ message: "Logout successful" });
  }
);

export const loginAdmin = asyncHandeller(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginType = req.body;
    console.log("data: ", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    console.log("body: ", req.body);
    if (email !== process.env.ADMIN_EMAIL)
      return next(new Error("This user does not exist", { cause: 404 }));

    if (password !== process.env.ADMIN_PASSWORD) {
      return next(new Error("Wrong password", { cause: 400 }));
    }
    const token: string = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ message: "Welcome Admin!", data: token });
  }
);
