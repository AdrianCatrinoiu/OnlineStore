import React from "react";
import SignUp from "../../components/SignUp";
import MainLayout from "../../layouts/MainLayout";
import "./styles.scss";

const Register = (props) => {
  return (
    <MainLayout>
      <SignUp />
    </MainLayout>
  );
};

export default Register;
