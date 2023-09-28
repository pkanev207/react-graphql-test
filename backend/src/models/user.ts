import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    //@ts-ignore
    name: { type: String, required: [true, "Please add a name"], validate: [validator.isAlphanumeric, "Please enter valid username"] },
    //@ts-ignore
    email: { type: String, required: true, validate: [validator.isEmail!, "Please enter a valid username"] },
    password: { type: String, required: [true, "Please add a password"], select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.isValidPassword = async function (userSendPassword, oldPassword) {
  return await bcrypt.compare(userSendPassword, oldPassword);
};

userSchema.statics.getJwtToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// userSchema.index(
//   { username: 1 },
//   {
//     unique: true,
//     collation: { locale: "en", strength: 2 },
//   },
// );

// const User = mongoose.model("User", userSchema);
type User = mongoose.InferSchemaType<typeof userSchema>;

export default mongoose.model<User>("User", userSchema);
