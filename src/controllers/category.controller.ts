import mongoose from "mongoose";
import CategoryModel from "../database/models/category.model.js";
import { asyncHandeller } from "../utils/errorHandling.js";
import { Request, Response } from "express";

const defaultCategoriesList = [
  'Cookies',
'Mini Cookies',
'Cooki dough',
'Gift', 
'Party',
'Special order',
];

export const createCategory = asyncHandeller(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await CategoryModel.create({ name });
    return res.status(200).json({ message: "success", data: category });
  }
);

export const getAllCategories = asyncHandeller(
  async (_req: Request, res: Response) => {
    // Fetch categories from the database
    const categories = await CategoryModel.find();

    // If no categories exist, insert the default ones
    if (categories.length === 0) {
      const defaultCategories = defaultCategoriesList.map((name) => ({ name }));
      await CategoryModel.insertMany(defaultCategories);
    }

    // Fetch the updated categories after insertion
    const updatedCategories = await CategoryModel.find();

    return res.status(200).json({ message: "success", data: updatedCategories });
  }
);

export const getOneCategory = asyncHandeller(
  async (req: Request, res: Response) => {
    const { key } = req.params; // the key is an id or name
    let category = null
    if (key instanceof mongoose.Types.ObjectId)
      category = await CategoryModel.findById(key);
    else category = await CategoryModel.findOne({ name: key });
    if(!category) return res.status(404).json({ message: "Category not found" });
    return res.status(200).json({ message: "success", data: category });
  }
);

export const updateCategory = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Category updated", data: updatedCategory });
  }
);

export const deleteCategory = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Category deleted", data: deletedCategory });
  }
);
