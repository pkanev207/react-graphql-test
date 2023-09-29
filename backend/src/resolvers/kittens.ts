import Kitten from "../models/kittens.js";
import { checkAuth } from "../utils/checkAuth.ts";

const kittensQuery = {
  getKitten: async (_, args) => {
    return await Kitten.findOne({ _id: args.id });
  },
  getKittens: async () => {
    return await Kitten.find({});
  },
};

const kittensMutation = {
  createKitten: async (parent, args, req, info) => {
    try {
      const auth = await checkAuth(req.headers.authorization);
      const kitten = new Kitten({
        name: args.name,
        breed: args.breed,
        userId: auth._id.toString(),
      });

      return await kitten.save();
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  },
  updateKitten: async (_, args, req) => {
    try {
      const auth = await checkAuth(req.headers.authorization);

      if (auth.role === "admin") {
        await Kitten.findOneAndUpdate({ _id: args.id }, args as object);
        return await Kitten.findOne({ _id: args.id });
      } else {
        throw new Error("Not authorized!");
      }
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  },
  deleteKitten: async (_, args, req) => {
    try {
      const auth = await checkAuth(req.headers.authorization);

      if (auth.role === "admin") {
        return await Kitten.findOneAndDelete({ _id: args.id });
      } else {
        throw new Error("Not authorized!");
      }
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  },
};

export { kittensQuery, kittensMutation };
