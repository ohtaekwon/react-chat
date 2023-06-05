import mongoose from "mongoose";

export default mongoose.model(
  "Post",
  mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
  )
);
