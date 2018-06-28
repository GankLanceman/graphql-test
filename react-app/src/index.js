import ApolloClient from "apollo-boost";
import React from "react";
import App from "./app";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const app = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(app, document.getElementById("root"));