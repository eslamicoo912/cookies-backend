import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  mainPrice: { type: Number },
  prices: {
    boxOfthree: { type: Number },
    boxOfsix: { type: Number },
    boxOftwelve: { type: Number },
    customPrice: { type: Number },
  },
  category: { type: String, required: true },
});

const ProductModel = model("Product", productSchema);

export default ProductModel;
