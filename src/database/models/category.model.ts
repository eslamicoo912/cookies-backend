import { Schema, model } from "mongoose";

export const categorySchema = new Schema({
    name: { type: String, required: true },
});

const CategoryModel = model("Category", categorySchema);

export default CategoryModel;