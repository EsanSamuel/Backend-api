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
