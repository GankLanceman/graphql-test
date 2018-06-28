import React from "react";
import CreatorList from "./components/creator-list";
import ReportDisplay from "./components/report-display";
import './app.css';
import CreateReport from "./components/create-report";

const App = () => (
  <div>
    <CreateReport />
    <h2>Report List</h2>
    <ReportDisplay />
    <br />
    <h2>Creator List</h2>
    <CreatorList />
  </div>
)

export default App;
