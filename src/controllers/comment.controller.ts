import Comment from "../models/comment.model";
import express from "express";
import { ApiError } from "../utils/ApiError";
import { ApiSuccess } from "../utils/ApiSuccess";
import {
  commentValidation,
  commentType,
  updateCommentValidation,
  updateCommentType,
} from "../libs/validation";

export const createComment = async (
  req: express.Request,
  res: express.Response
) => {
  const validate = commentValidation.parse(req.body);
  const { userId, productId, comment }: commentType = validate;
  try {
    const createcomment = new Comment({
      poster: userId,
      product: productId,
      comment,
    });
    await createcomment.save();
    res
      .status(201)
      .json(new ApiSuccess(201, "Comment created!", createcomment));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", error));
  }
};

export const getComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const getcomment = await Comment.find({ product: id }).populate("poster");
    res.status(200).json(new ApiSuccess(200, "Comment gotten!", getcomment));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", error));
  }
};

export const updateComment = async (
  req: express.Request,
  res: express.Response
) => {
  const validate = updateCommentValidation.parse(req.body);
  const { comment }: updateCommentType = validate;
  try {
    const id = req.params.id;
    const updatecomment = await Comment.findById(id);
    updatecomment.comment = comment;
    await updatecomment.save();
    res.status(200).json(new ApiSuccess(200, "Comment updated!", updatecomment));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", error));
  }
};

export const deleteComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByIdAndDelete(id);
    res.status(200).json(new ApiSuccess(200, "Comment deleted!", ""));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", error));
  }
};
