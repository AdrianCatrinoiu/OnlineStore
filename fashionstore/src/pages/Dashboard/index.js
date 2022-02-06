import React from "react";
import WithAuth from "../../hoc/withAuth";
import "./styles.scss";

const Dashboard = (props) => {
  return (
    <WithAuth>
      <h1>You're logged in</h1>
    </WithAuth>
  );
};

export default Dashboard;
