import React from "react";
import { CREATE_REPORT } from "../graphql/mutations";
import { GET_REPORTS } from "../graphql/queries";
import { Mutation } from "react-apollo";

const CreateReport = () => {
  let reportName;
  let creator;

  return (
    <Mutation
      mutation={CREATE_REPORT}
      update={(cache, { data: { createReport } }) => {
        const { reports } = cache.readQuery({ query: GET_REPORTS })
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

export default CreateReport;