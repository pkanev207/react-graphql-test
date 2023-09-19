import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

// export const db = mongoose.connection;
// db.on("error", console.log("connection error"));
// db.once("open", function () {
//   console.log("we're connected");
// });

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://127.0.0.1:27017/test");

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

export default connectDB;
