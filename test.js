const request = require("request");

const dice = process.argv[2] ? process.argv[2] : 6;
const sides = process.argv[3] ? process.argv[3] : 6;

request(
  { 
    json: true,
    body: {
      query: `query RollDice($dice: Int! $sides: Int) {
          rollDice(numDice: $dice, numSides: $sides),
          quoteOfTheDay,
          random
          getDie(numSides: $sides) {
            rollOnce,
            roll(numRolls: $dice)
          }
        }`,
      variables: { dice, sides }
    },
    url: "http://localhost:4000/graphql"
  },
  (error, response, body) => {
    console.log(body);
  }
)