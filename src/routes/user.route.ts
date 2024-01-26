import {
  createUser,
  deleteUser,
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

export default router;
