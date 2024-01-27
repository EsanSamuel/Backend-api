import {
  LikeProduct,
  UnLikeProduct,
  getLikes,
} from "../controllers/like.controller";
import express from "express";

const router = express.Router();

router.post("/like/:id", LikeProduct);
router.delete("/like/:id", UnLikeProduct);
router.get("/like/:id", getLikes);

export default router;
