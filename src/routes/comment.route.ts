import {
  createComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/comment.controller";
import express from "express";

const router = express.Router();

router.post("/create-comment", createComment);
router.get("/comment/:id", getComment);
router.patch("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

export default router;
