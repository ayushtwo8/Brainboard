import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    types: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const LinkModel = mongoose.model("Link", linkSchema);
