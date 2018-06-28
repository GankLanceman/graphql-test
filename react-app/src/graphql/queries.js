import gql from "graphql-tag";

export const GET_REPORTS = gql`
  {
    reports {
      id
      name
      columns
      creator
    }
  }
`