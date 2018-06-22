const request = require("request");

request.post(
  {
    json: true,
    body: {
      query: `mutation createReport($input: ReportInput) {
        createReport(input: $input) {
          id
          columns
          name
          creator
        }
      }`,
      variables: {
        input: {
          creator: "Gank Lanceman",
          name: "Love is a battlefield!",
          columns: [
            "Column 1",
            "Column 2"
          ]
        }
      }
    },
    url: "http://localhost:4000/graphql"
  },
  (error, response, body) => {
    console.log(body);
  }
)