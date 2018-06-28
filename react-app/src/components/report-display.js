import { GET_REPORTS } from "../graphql/queries";
import { Query } from "react-apollo";
import React from "react";

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

export default ReportDisplay;