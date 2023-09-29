//@ts-nocheck
import express from "express";
import "dotenv/config";
import "graphql-import-node";
import gql from "graphql-tag";
import { readFileSync } from "fs";
import cors from "cors";
import colors from "colors";
colors.enable();

import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";

import * as resolvers from "./src/resolvers/index.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const typeDefs = gql(
  readFileSync("./src/typeDefs/schema.graphql", {
    encoding: "utf-8",
  }),
);
import Kitten from "./src/models/kittens.js";
import connectDB from "./src/db/conn.js";
void connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(function (err, req, res, next) {
  // only for invalid syntax json
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json("Syntax Error!!!");
  }
});

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
await server.start();

app.use(
  "/graphql",
  express.json(),
  cors(),
  expressMiddleware(server, {
    // context: async b => b,
    // context: async ({ req }) => ({ token: req.headers.token }),
    context: async ({ req }) => req,
  }),
);

app.get("/test/kittens", async (_req, res) => {
  const kittens = await Kitten.find({});
  res.send(kittens);
});

app.listen(3000, () => console.log("Server listening on port 3000".green));
