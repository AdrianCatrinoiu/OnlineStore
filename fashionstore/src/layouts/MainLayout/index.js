import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/index.js";

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
