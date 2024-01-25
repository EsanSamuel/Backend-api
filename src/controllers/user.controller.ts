import User from "../models/user.model";
import express from "express";
import {
  userValidation,
  loginValidation,
  updateValidation,
} from "../libs/validation";
import bcrypt from "bcrypt";

//create new user account
export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  const validate = userValidation.parse(req.body);
  const { email, password, username } = validate;
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(500).json("User already exists!");
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
    res.status(201).json(createuser);
  } catch (error: any) {
    console.log(error);
    res.status(500).json("Something went wrong!");
  }
};

//log in with existing accout
export const login = async (req: express.Request, res: express.Response) => {
  const validate = loginValidation.parse(req.body);
  const { email, password } = validate;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json("User does not exists!");
    }

    if (user.password === password) {
      res.status(201).json("Password correct!");
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json("Something went wrong!");
  }
};

//fetch all existing users account
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getUsers = await User.find({});
    res.status(200).json(getUsers);
  } catch (error: any) {
    console.log(error);
    res.status(500).json("Something went wrong!");
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
    res.status(200).json(getUserById);
  } catch (error: any) {
    console.log(error);
    res.status(500).json("Something went wrong!");
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
    res.status(200).json('Deleted successfully!');
  } catch (error: any) {
    console.log(error);
    res.status(500).json("Something went wrong!");
  }
};

//edit your profile
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  const validate = updateValidation.parse(req.body);
  const { username } = validate;
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    user.username = username;
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    console.log(error);
    res.status(500).json("Something went wrong!");
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
    res.status(201).json(userId);
  } catch (error: any) {
    console.log(error);
    res.status(500).json("Something went wrong!");
  }
};
