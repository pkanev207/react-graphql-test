import jwt from "jsonwebtoken";
import User from "../models/user.ts";

const secret = process.env.JWT_SECRET;
// Typescript don't know about _id in token
interface JwtPayload {
  id: string;
}

export async function checkAuth(authStr: string | null) {
  if (authStr !== null && authStr.startsWith("Bearer")) {
    try {
      const token = authStr.split(" ")[1];

      if (!token) {
        throw new Error("Not authorized, no token!");
      }

      const { id } = jwt.verify(token, secret) as JwtPayload;
      console.log(id);

      const user = await User.findById(id);
      console.log(user);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Not authorized!");
    }
  } else {
    throw new Error("Not authorized, no token!");
  }
}
