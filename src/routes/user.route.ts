import {
  createBio,
  createProfilePicture,
  createUser,
  deleteUser,
  editBio,
  editProfilePicture,
  getAllUsers,
  getUserId,
  getUsersById,
  login,
  updateUser,
} from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.post("/auth/register", createUser);
router.post("/auth/login", login);
router.get("/users", getAllUsers);
router.get("/users/:id", getUsersById);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser);
router.get("/userid", getUserId);
router.post("/profile-picture/:id", createProfilePicture);
router.post("/bio/:id", createBio);
router.patch("/edit-picture/:id", editProfilePicture);
router.patch("/bio/:id", editBio);


export default router;
