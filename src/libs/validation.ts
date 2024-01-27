import { z } from "zod";

export const userValidation = z.object({
  username: z.string().min(1).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

export type userType = z.infer<typeof userValidation>;

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type loginType = z.infer<typeof loginValidation>;

export const updateValidation = z.object({
  username: z.string().min(1).max(20),
});

export type updateType = z.infer<typeof updateValidation>;

export const productValidation = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  details: z.string().min(1),
  image: z.string().min(1),
  price: z.string().min(1),
});

export type productType = z.infer<typeof productValidation>;

export const updateProductValidation = z.object({
  title: z.string().min(1),
  details: z.string().min(1),
  image: z.string().min(1),
  price: z.string().min(1),
});

export type updateProductType = z.infer<typeof updateProductValidation>;

export const likeValidation = z.object({
  userId: z.string().min(1),
});

export type likeType = z.infer<typeof likeValidation>;

export const commentValidation = z.object({
  userId: z.string().min(1),
  productId: z.string().min(1),
  comment: z.string().min(1),
});

export type commentType = z.infer<typeof commentValidation>;

export const updateCommentValidation = z.object({
  comment: z.string().min(1),
});

export type updateCommentType = z.infer<typeof updateCommentValidation>;
