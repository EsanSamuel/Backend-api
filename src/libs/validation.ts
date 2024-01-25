import { z } from "zod";

export const userValidation = z.object({
  username: z.string().min(1).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  export const updateValidation = z.object({
    username: z.string().min(1).max(20),
  });
