/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//@ts-nocheck
import express from "express";
import "dotenv/config";
import "graphql-import-node";
import gql from "graphql-tag";
import cors from "cors";
import colors from "colors";
colors.enable();

import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";

// import resolvers from "./resolvers/resolvers.js";
import * as resolvers from "./src/resolvers/index.js";
// console.log(resolvers);
// import * as typeDefs from "./typeDefs/schema.js";
import { readFileSync } from "fs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const typeDefs = gql(
  readFileSync("./src/typeDefs/schema.graphql", {
    encoding: "utf-8",
  }),
);

// import { db } from "./db/conn.js";
import connectDB from "./src/db/conn.js";
void connectDB();
import Kitten from "./src/models/kittens.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(function (err, req, res, next) {
  // only for invalid syntax json
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json("Syntax Error!!!");
  }
});

console.log(process.env.MY_SECRET);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
await server.start();

app.use("/graphql", express.json(), cors(), expressMiddleware(server));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get("/test/kittens", async (_req, res) => {
  const kittens = await Kitten.find({});
  res.send(kittens);
});

app.listen(3000, () => console.log("Server listening on port 3000".green));
