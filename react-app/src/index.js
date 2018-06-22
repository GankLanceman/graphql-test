import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import { ApolloProvider, Mutation, Query } from "react-apollo";
import { render } from "react-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <AddTodo />
      <h2>Report List</h2>
      <ReportDisplay />
      <br />
      <h2>Creator List</h2>
      <CreatorList />
    </div>
  </ApolloProvider>
);

const GET_REPORTS = gql`
  {
    reports {
      id
      name
      columns
      creator
    }
  }
`
const CreatorList = () => (
  <Query query={GET_REPORTS}>
    {
      ({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        
        return data.reports.map((report, index) => <div key={index}>{report.creator}</div>)
      }
    }
  </Query>
)

const ReportDisplay = () => (
  <Query query={GET_REPORTS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.reports.map(({ name, columns, creator, id }) => (
        <div key={id}>
          <br />
          <div>
            Report Name: {name}
            <br />
            {`Created by: ${creator}`}
            <br />
            Columns:
            {columns.map((column, index) => <div key={index}>{column}</div>)}
          </div>
        </div>
      ));
    }}
  </Query>
);

const AddTodo = () => {
  let reportName;
  let creator;

  return (
    <Mutation 
      mutation={gql`
        mutation createReport($input: ReportInput) {
        createReport(input: $input) {
            id
            creator
            columns
            name
          }
        }
      `}
      update={(cache, { data: { createReport } }) => {
        const { reports } = cache.readQuery({ query: GET_REPORTS})
        cache.writeQuery({
          query: GET_REPORTS,
          data: { reports: reports.concat([createReport]) }
        })
      }}
    >
      {
        (createReport, { loading, error }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                createReport({ 
                  variables: { 
                    input: { 
                      name: reportName.value,
                      creator: creator.value
                    } 
                  } 
                });
                reportName.value = "";
                creator.value = "";
              }}
            >
              Report Name:
              <input
                ref={node => {
                  reportName = node;
                }}
              />
              <br />
              Report Creator:
              <input
                ref={node => {
                  creator = node;
                }}
              />
              <br />
              <button type="submit">Create Report</button>
            </form>
          </div>
        )
      }
    </Mutation>
  );
};

render(<App />, document.getElementById("root"));