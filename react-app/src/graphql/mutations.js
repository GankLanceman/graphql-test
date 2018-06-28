import gql from "graphql-tag";

export const CREATE_REPORT = gql`
  mutation createReport($input: ReportInput) {
  createReport(input: $input) {
      id
      creator
      columns
      name
    }
  }
`