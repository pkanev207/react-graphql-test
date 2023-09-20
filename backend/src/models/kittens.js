import mongoose from "mongoose";

const Kitten = mongoose.model(
  "Kitten",
  new mongoose.Schema({
    name: { type: String, required: true },
    breed: String,
  }),
);

export default Kitten;
