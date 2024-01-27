import { Schema, models, model } from "mongoose";
import { IProduct } from "../types";

const productSchema = new Schema<IProduct>({
  poster: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  image: { type: String },
  price: { type: String },
  details: { type: String },
  createdAt: { type: String, default: new Date() },
  likes: { type: Number, default: 0 },
});

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
