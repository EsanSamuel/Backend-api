import { Schema, models, model } from "mongoose";
import { IComment } from "types";

const commentSchema = new Schema<IComment>({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comment = models.Comment || model<IComment>("Comment", commentSchema);

export default Comment;
