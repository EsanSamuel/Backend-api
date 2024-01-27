import express from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

declare module "express" {
  interface Request {
    user?: any;
  }
}

const secret = "mytokensecret";
const authenticateToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json(new ApiError(401, "unauthorized", ["unauthorized"]));
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      res.status(401).json(new ApiError(401, "forbidden", ["forbidden"]));
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
