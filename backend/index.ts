/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import "graphql-import-node";
import gql from "graphql-tag";
import cors from "cors";
import colors from "colors";
colors.enable();

import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";

// import resolvers from "./resolvers/resolvers.js";
import * as resolvers from "./resolvers/index.js";
// console.log(resolvers);
// import * as typeDefs from "./typeDefs/schema.js";
import { readFileSync } from "fs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const typeDefs = gql(
  readFileSync("./typeDefs/schema.graphql", {
    encoding: "utf-8",
  }),
);

// import { db } from "./db/conn.js";
import connectDB from "./db/conn.js";
void connectDB();

import Kitten from "./models/kittens.js";

const app = express();

app.use(cors());
app.use(express.json());

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

app.listen(3000, () => console.log("Listening on port 3000"));
