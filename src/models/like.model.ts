import { Schema, models, model } from "mongoose";
import { ILike } from "types";

const likeSchema = new Schema<ILike>({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Like = models.Like || model<ILike>("Like", likeSchema);

export default Like;
