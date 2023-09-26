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
    await Kitten.findOneAndUpdate({ _id: args.id }, args as object);
    return await Kitten.findOne({ _id: args.id });
  },
  deleteKitten: async (parent, args) => {
    return await Kitten.findOneAndDelete({ _id: args.id });
  },
};

export { kittensQuery, kittensMutation };
