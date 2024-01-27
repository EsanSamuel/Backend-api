import { Schema, models, model } from "mongoose";
import { IUser } from "../types";

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
