import User from "../models/user.js";
import Kitten from "../models/kittens.js";
import { ObjectId } from "mongoose";
//resolvers.mjs
const resolvers = {
  Query: {
    async getUser(_, args) {
      return await User.findOne({ _id: args._id });
    },
    async getUsers() {
      return await User.find({});
    },

    async getKitten(_, { id }) {
      let query = { _id: new ObjectId(id) };
      // let collection = await db.collection("kittens");
      return await Kitten.findById(...query);
    },
    async getKittens() {
      return await Kitten.find({});
    },
  },

  Mutation: {
    async createUser(parent, args) {
      const user = new User({
        name: args.name,
        email: args.email,
        password: args.password,
      });

      return await user.save();
    },
    async updateUser(parent, args) {
      return await User.findOneAndUpdate({ _id: args._id }, args);
    },
    async deleteUser(parent, args) {
      return await User.findOneAndDelete({ _id: args._id });
    },
  },
};

export default resolvers;

// import db from "../db/conn.js";
// import { ObjectId } from "mongodb";

// const resolvers = {
//   Record: {
//     id: (parent) => parent.id ?? parent._id,
//   },
//   Query: {
//     async record(_, { id }, context) {
//       let collection = await db.collection("records");
//       let query = { _id: new ObjectId(id) };

//       return await collection.findOne(query);
//     },
//     async records(_, __, context) {
//       let collection = await db.collection("records");
//       const records = await collection.find({}).toArray();
//       return records;
//     },
//   },
//   Mutation: {
//     async createRecord(_, { name, position, level }, context) {
//       let collection = await db.collection("records");
//       const insert = await collection.insertOne({ name, position, level });
//       if (insert.acknowledged)
//         return { name, position, level, id: insert.insertedId };
//       return null;
//     },
//     async updateRecord(_, args, context) {
//       const id = new ObjectId(args.id);
//       let query = { _id: new ObjectId(id) };
//       let collection = await db.collection("records");
//       const update = await collection.updateOne(query, { $set: { ...args } });

//       if (update.acknowledged) return await collection.findOne(query);

//       return null;
//     },
//     async deleteRecord(_, { id }, context) {
//       let collection = await db.collection("records");
//       const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
//       return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
//     },
//   },
// };

// export default resolvers;
