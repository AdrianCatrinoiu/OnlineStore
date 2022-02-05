import React from "react";
import SignIn from "../../components/SignIn/SignIn";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import "./styles.scss";

const Login = (props) => {
  return (
    <MainLayout>
      <div>
        <SignIn></SignIn>
      </div>
    </MainLayout>
  );
};

export default Login;
