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
