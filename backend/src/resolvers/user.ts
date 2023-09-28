/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-empty-pattern */
import User from "../models/user.ts";

const usersQuery = {
  getUser: async (_, args, {}) => {
    return await User.findOne({ _id: args._id });
  },
  getUsers: async () => {
    return await User.find({});
  },
  loginUser: async (parent, args, context) => {
    const { email, password } = args.input;
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");
    //@ts-ignore
    const isValidPass = await User.isValidPassword(password, user.password);
    if (isValidPass) {
      // console.log(user);
      return {
        _id: user.id,
        name: user.name,
        email: user.email,
        // role: user.role || "user",
        role: user.role ?? "user",
        //@ts-ignore
        token: await User.getJwtToken(user._id.toString()),
      };
    }

    throw new Error("User not found!!!");
  },
};

const usersMutation = {
  createUser: async (parent, args, {}) => {
    const { name, email, password } = args.input;
    const user = new User({ name, email, password });
    await user.save();
    //@ts-ignore
    const token = await User.getJwtToken(user._id.toString());
    return { name, token };
  },
  updateUser: async (parent, args, {}) => {
    return await User.findOneAndUpdate({ _id: args._id }, args);
  },
  deleteUser: async (parent, args, {}) => {
    return await User.findOneAndDelete({ _id: args._id });
  },
};

export { usersQuery, usersMutation };
