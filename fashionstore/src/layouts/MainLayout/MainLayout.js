import React from "react";
import Footer from "../../components/Footer.js/Footer";
import Navbar from "../../components/Navbar.js/Navbar";

const MainLayout = (props) => {
  return (
    <div>
      <Navbar {...props} />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
