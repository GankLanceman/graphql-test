const request = require("request");

request(
  {
    json: true,
    body: {
      query: `mutation CreateMessage($input: MessageInput) {
        createMessage(input: $input) {
          id
        }
      }`,
      variables: {
        input: {
          author: "Gank Lanceman",
          content: "Love is a battlefield!"
        }
      }
    },
    url: "http://localhost:4000/graphql"
  },
  (error, response, body) => {
    console.log(body);
  }
)