const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

let schema = buildSchema('type Query { hello: String }');

let root = {
  hello: () => {
    return "Hello World!";
  }
};

const app = express();
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

const port = 4000

// Start listening on the submitted port
app.listen(port);
console.log(`Now listening on port ${port}`);