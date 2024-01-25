import mongoose from "mongoose";

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect("mongodb+srv://samuel:sam123@cluster0.kvfplyr.mongodb.net/")
    .then(() => console.log("Database connected!"));
};

export default connectDB;
