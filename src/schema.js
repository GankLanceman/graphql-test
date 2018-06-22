const { gql, ForbiddenError, AuthenticationError } = require('apollo-server');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
module.exports.typeDefs = gql`
  input ReportInput {
    name: String
    columns: [String]
    creator: String
  }

  # This "Message" type can be used in other type declarations.
  type Report {
    id: ID!
    name: String
    columns: [String]
    creator: String
  }

  type Query {
    getReport(id: ID!): Report
    reports: [Report]
    creators: [String]
  }

  type Mutation {
    createReport(input: ReportInput): Report
    updateReport(id: ID!, input: ReportInput): Report
  }
`

class Report {
  constructor(id, { name, columns, creator }) {
    this.id = id;
    this.name = name;
    this.columns = columns;
    this.creator = creator;
  }
}

let fakeDatabase = {};

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
module.exports.resolvers = {
  Query: {

    getReport: (root, { id }) => {
      if (!fakeDatabase[id]) {
        throw new Error("no report exists with the id " + id);
      }
  
      return new Report(id, fakeDatabase[id]);
    },

    reports: () => {
      if (!fakeDatabase) {
        throw new Error("no report exists with the id " + id);
      }
  
      return Object.values(fakeDatabase)
    },

    // creators: () => {
    //   return Object.values(fakeDatabase).map(report => report.creator)
    // }
  },
  Mutation: {
    createReport: (root, { input }) => {
      let id = require("crypto").randomBytes(10).toString("hex");
  
      fakeDatabase[id] = input;
      return new Report(id, fakeDatabase[id]);
    },
    updateReport: ({ id, input }) => {
      if (!fakeDatabase[id]) {
        throw new Error("no report exists with id " + id)
      }
  
      fakeDatabase[id] = input;
      return new Report(id, input);
    }
  }
}
