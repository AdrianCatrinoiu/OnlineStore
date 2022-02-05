import React from "react";
import SignUp from "../../components/SignUp/SignUp";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import "./styles.scss";

const Register = (props) => {
  return (
    <MainLayout>
      <SignUp />
    </MainLayout>
  );
};

export default Register;
