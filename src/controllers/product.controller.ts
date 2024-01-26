import { ApiError } from "../utils/ApiError";
import {
  productType,
  productValidation,
  updateProductValidation,
  updateProductType,
} from "../libs/validation";
import Product from "../models/product.model";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { ApiSuccess } from "../utils/ApiSuccess";

cloudinary.config({
  cloud_name: "dirm0bwdw",
  api_key: "244737511899697",
  api_secret: "LBf0Bay00WC4w1bonkdeapChUO4",
});

export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const validate = productValidation.parse(req.body);
  const { userId, image, details, price, title }: productType = validate;
  const ImageUrl = await cloudinary.uploader.upload(image);
  try {
    const createproduct = new Product({
      poster: userId,
      title,
      image: ImageUrl.url,
      details,
      price,
    });

    await createproduct.save();
    res
      .status(201)
      .json(new ApiSuccess(201, "Product created!", createproduct));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", error));
  }
};

export const getProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getproduct = await Product.find({}).populate("poster");
    res
      .status(200)
      .json(new ApiSuccess(200, "All Products gotten!", getproduct));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", error));
  }
};

export const getProductById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const getproductbyid = await Product.findById(id).populate("poster");
    res
      .status(200)
      .json(new ApiSuccess(200, "Product gotten!", getproductbyid));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", error));
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const validate = updateProductValidation.parse(req.body);
  const { title, details, price, image }: updateProductType = validate;
  const ImageUrl = await cloudinary.uploader.upload(image);
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    product.title = title;
    product.details = details;
    product.price = price;
    product.image = ImageUrl.url;

    await product.save();

    res.status(200).json(new ApiSuccess(200, "Product updated!", product));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", error));
  }
};

export const deleteProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const deleteproduct = await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json(new ApiSuccess(200, "Product deleted!", deleteproduct));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", error));
  }
};
