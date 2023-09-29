import mongoose from "mongoose";

const Kitten = mongoose.model(
  "Kitten",
  new mongoose.Schema({
    name: { type: String, required: true },
    breed: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  }),
);

export default Kitten;
