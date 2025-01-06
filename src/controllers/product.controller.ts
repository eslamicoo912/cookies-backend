import ProductModel from "../database/models/product.model.js";
import { ProductType } from "../types/product.types.js";
import { asyncHandeller } from "../utils/errorHandling.js";
import { Request, Response } from "express";
import paginationFunction from "../utils/pagination.js";

export const createProcuct = asyncHandeller(
  async (req: Request, res: Response) => {
    console.log("req.body", req.body);
    
    const { name, description, prices, image, category }: ProductType = req.body;
    const product: ProductType | null = await ProductModel.findOne({ name });
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }

    let productImage: string | null = null;
     if (req.file) {
       console.log("req.file", req.file);
       productImage = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
    }

    const newProduct = await ProductModel.create({
      name,
      description,
      image: productImage || image,
      prices,
      category
    });

    await newProduct.save();

    return res
      .status(200)
      .json({ message: "Product created", data: newProduct });
  }
);

export const getAllProducts = asyncHandeller(
  async (req: Request, res: Response) => {
    const { limit, skip } = paginationFunction(req.query);
    const { sort } = req.query;
    const products: ProductType[] = (await ProductModel.find()
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .lean()) as unknown as ProductType[];
    if (!products.length)
      return res.status(404).json({ message: "No products found" });
    return res.status(200).json({ message: "success", data: products });
  }
);

export const getProductById = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product: ProductType | null = await ProductModel.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "success", data: product });
  }
);

export const updateProduct = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.file) {
      req.body.image = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
    }

    const product: ProductType | null = await ProductModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product updated", data: product });
  }
);

export const deleteProduct = asyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product: ProductType | null = await ProductModel.findByIdAndDelete(
      id
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product deleted", data: product });
  }
);
