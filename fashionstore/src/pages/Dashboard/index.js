import React from "react";
import WithAuth from "../../hoc/withAuth";
import DashBoardLayout from "../../layouts/DashboardLayout";
import "./styles.scss";

const Dashboard = (props) => {
  return (
    <WithAuth>
      <DashBoardLayout>
        <h1>You're logged in</h1>
      </DashBoardLayout>
    </WithAuth>
  );
};

export default Dashboard;
