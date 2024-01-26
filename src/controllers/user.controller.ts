import User from "../models/user.model";
import express from "express";
import {
  userValidation,
  loginValidation,
  updateValidation,
  loginType,
  updateType,
  userType,
} from "../libs/validation";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError";
import z from "zod";
import { ApiSuccess } from "../utils/ApiSuccess";

//create new user account
export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  const validate = userValidation.parse(req.body);
  const { email, password, username }: userType = validate;
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res
        .status(500)
        .json(
          new ApiError(500, "User already exists!", ["User already exists!"])
        );
    }

    if (!email || !password || !username) {
      res.status(404).json("Credentials required!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createuser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(new ApiSuccess(201, "User created!", createuser));
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, "Something went wrong", [
        error.errors[0].message,
      ]);
    }
    throw error;
  }
};

//log in with existing accout
export const login = async (req: express.Request, res: express.Response) => {
  const validate = loginValidation.parse(req.body);
  const { email, password }: loginType = validate;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res
        .status(404)
        .json(new ApiError(404, "User not found!", ["User not found!"]));
    }

    if (user.password === password) {
      res.status(201).json(new ApiSuccess(200, "Password correct", user));
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, "Something went wrong", [
        error.errors[0].message,
      ]);
    }
    throw error;
  }
};

//fetch all existing users account
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getUsers = await User.find({});
    res.status(200).json(new ApiSuccess(200, "Users found!", getUsers));
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json(new ApiError(500, "Users not found!", ["Users not found!"]));
  }
};

//fetch only a particular user's account
export const getUsersById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const getUserById = await User.findById(id);
    res.status(200).json(new ApiSuccess(200, "User gotten", getUserById));
  } catch (error: any) {
    console.log(error);
    res.status(500).json(new ApiError(500, "Something went wrong!", error));
  }
};

//delete a particular user's account
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = req.params.id;
    const deleteuser = await User.findByIdAndDelete(id);
    res
      .status(200)
      .json(new ApiSuccess(200, "Deleted successfully!", deleteuser));
  } catch (error: any) {
    console.log(error);
    res.status(500).json(new ApiError(500, "Something went wrong!", error));
  }
};

//edit your profile
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  const validate = updateValidation.parse(req.body);
  const { username }: updateType = validate;
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    user.username = username;
    await user.save();
    res.status(201).json(new ApiSuccess(201, "user updated", user));
  } catch (error: any) {
    console.log(error);
    res.status(500).json(new ApiError(500, "Something went wrong!", error));
  }
};

//get the id string of logged in user
export const getUserId = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const userId = user._id.toString();
    res.status(201).json(new ApiSuccess(201, "user's id gotten", userId));
  } catch (error: any) {
    console.log(error);
    res.status(500).json(new ApiError(500, "Something went wrong!", error));
  }
};
