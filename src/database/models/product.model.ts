import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  prices: {
    boxOfthree: { type: Number, required: true },
    boxOfsix: { type: Number, required: true },
    boxOftwelve: { type: Number, required: true },
    customPrice: { type: Number, required: true },
  },
  category: { type: String, required: true },
});

const ProductModel = model("Product", productSchema);

export default ProductModel;
