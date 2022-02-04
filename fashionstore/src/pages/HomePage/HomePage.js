import React from "react";
import Directory from "../../components/Directory/Directory";
import HomePageLayout from "../../layouts/HomePageLayout/HomePageLayout";
import "./styles.scss";

const Homepage = () => {
  return (
    <HomePageLayout>
      <section className="homepage">
        <Directory />
      </section>
    </HomePageLayout>
  );
};

export default Homepage;
