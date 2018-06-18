const request = require("request");

request(
  { 
    json: true,
    body: {"query": "{ hello }"},
    url: "http://localhost:4000/graphql"
  },
  (error, response, body) => {
    console.log(body);
  }
)