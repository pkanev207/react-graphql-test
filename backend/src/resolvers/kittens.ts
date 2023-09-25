/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Kitten from "../models/kittens.js";

const kittensQuery = {
  getKitten: async (_, args) => {
    // console.log("From getKittens!");
    return await Kitten.findOne({ _id: args.id });
  },
  getKittens: async () => {
    return await Kitten.find({});
  },
};

const kittensMutation = {
  createKitten: async (_, args) => {
    const kitten = new Kitten({
      name: args.name,
      breed: args.breed,
    });

    return await kitten.save();
  },
  updateKitten: async (parent, args) => {
    return await Kitten.findOneAndUpdate({ _id: args._id }, args as object);
  },
  deleteKitten: async (parent, args) => {
    return await Kitten.findOneAndDelete({ _id: args._id });
  },
};

export { kittensQuery, kittensMutation };
