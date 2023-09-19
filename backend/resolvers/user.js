/* eslint-disable no-empty-pattern */
import User from "../models/user.js";

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
    const user = new User({
      name: args.name,
      email: args.email,
      password: args.password,
    });

    return await user.save();
  },
  updateUser: async (parent, args, {}) => {
    return await User.findOneAndUpdate({ _id: args._id }, args);
  },
  deleteUser: async (parent, args, {}) => {
    return await User.findOneAndDelete({ _id: args._id });
  },
};

export { usersQuery, usersMutation };
