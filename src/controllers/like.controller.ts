import { ApiError } from "../utils/ApiError";
import { likeType, likeValidation } from "../libs/validation";
import Like from "../models/like.model";
import express from "express";
import Product from "../models/product.model";
import { ApiSuccess } from "../utils/ApiSuccess";

export const LikeProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const validate = likeValidation.parse(req.body);
  const { userId }: likeType = validate;
  try {
    const id = req.params.id;
    const existingLike = await Like.findOne({
      poster: userId,
      product: id,
    });

    if (existingLike) {
      res
        .status(500)
        .json(new ApiError(500, "User already Liked", ["User already Liked"]));
    }

    const newLike = new Like({ poster: userId, product: id });
    await newLike.save();

    await Product.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    res.status(201).json(new ApiSuccess(201, "Product liked!", newLike));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong!", error));
  }
};

export const UnLikeProduct = async (
  req: express.Request,
  res: express.Response
) => {
  const validate = likeValidation.parse(req.body);
  const { userId }: likeType = validate;
  try {
    const id = req.params.id;
    const deleteLike = await Like.findOneAndDelete({
      poster: userId,
      product: id,
    });

    if (!deleteLike) {
      res
        .status(500)
        .json(
          new ApiError(500, "You haven't liked yet!", [
            "You haven't liked yet!",
          ])
        );
    }

    await Product.findByIdAndUpdate(id, { $inc: { likes: -1 } });

    res.status(201).json(new ApiSuccess(201, "Product unliked!", ""));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong!", error));
  }
};

export const getLikes = async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;

    const getlikes = await Like.find({ product: id }).populate("poster");
    res.status(201).json(new ApiSuccess(200, "Likes", getlikes));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong!", error));
  }
};
