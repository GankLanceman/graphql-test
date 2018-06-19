const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

let schema = buildSchema(`
  type Query { 
    quoteOfTheDay: String
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

let root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy": "Salvation lies within";
  },
  random: () => {
    return Math.random();
  },
  rollDice: ({numDice, numSides}) => {
    let output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))      
    }

    return output;
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