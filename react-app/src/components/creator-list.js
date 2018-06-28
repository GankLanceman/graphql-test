import { GET_REPORTS } from "../graphql/queries";
import { Query } from "react-apollo";
import React from "react";

const CreatorList = () => (
  <Query query={GET_REPORTS}>
    {
      ({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.reports.map((report, index) => <div key={index}>{report.creator}</div>)
      }
    }
  </Query>
)

export default CreatorList;