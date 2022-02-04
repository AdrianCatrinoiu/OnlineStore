import React from "react";
import Footer from "../../components/Footer.js/Footer";
import Navbar from "../../components/Navbar.js/Navbar";

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
