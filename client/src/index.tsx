import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloLink, InMemoryCache, ApolloProvider, HttpLink, concat } from "@apollo/client";
import App from "./App";

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });
const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = JSON.parse(localStorage.getItem("user") || "{}");
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      // authorization: token || null,
      authorization: token ? `Bearer ${token}` : null,
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  // uri: "http://localhost:3000/graphql",
  link: concat(authMiddleware, httpLink),
  // will memorize the query and the second time
  // instead of querying the server again will hit the cache
  cache: new InMemoryCache({ addTypename: false }),
  connectToDevTools: true,
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);

// // This next example demonstrates providing multiple custom links in an array:
// import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, from } from "@apollo/client";

// const httpLink = new HttpLink({ uri: "/graphql" });

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       authorization: localStorage.getItem("token") || null,
//     },
//   }));

//   return forward(operation);
// });

// const activityMiddleware = new ApolloLink((operation, forward) => {
//   // add the recent-activity custom header to the headers
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       "recent-activity": localStorage.getItem("lastOnlineTime") || null,
//     },
//   }));

//   return forward(operation);
// });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: from([authMiddleware, activityMiddleware, httpLink]),
// });
