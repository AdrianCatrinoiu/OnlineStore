import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const HomePageLayout = (props) => {
  return (
    <div className="layoutHeight">
      <Navbar {...props} />
      {props.children}
      <Footer />
    </div>
  );
};

export default HomePageLayout;
