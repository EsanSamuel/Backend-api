import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  image?: string;
  bio?: string;
  email: string;
}

export interface IProduct extends Document {
  poster: mongoose.Types.ObjectId;
  title: string;
  createdAt: any;
  details: string;
  price: string;
  image: string;
  likes: number;
}

export interface ILike extends Document {
  poster: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
}

export interface IComment extends Document {
  poster: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  comment: string;
}
