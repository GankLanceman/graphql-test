const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

let schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
    messages: [Message]
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

class Message {
  constructor(id, { content, author }) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

let fakeDatabase = {};

let root = {
  getMessage: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with the id " + id);
    }

    return new Message(id, fakeDatabase[id]);
  },
  messages: () => {
    if (!fakeDatabase) {
      throw new Error("no message exists with the id " + id);
    }

    return Object.values(fakeDatabase)
  },
  createMessage: ({ input }) => {
    let id = require("crypto").randomBytes(10).toString("hex");

    fakeDatabase[id] = input;
    return new Message(id, fakeDatabase[id]);
  },
  updateMessage: ({ id, input }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id)
    }

    fakeDatabase[id] = input;
    return new Message(id, input);
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