import React from "react";
import Products from "../../components/Products/Products";
import HomePageLayout from "../../layouts/HomePageLayout/HomePageLayout";

const Search = () => {
  return (
    <HomePageLayout>
      <div className="searchPage">
        <Products />
      </div>
    </HomePageLayout>
  );
};

export default Search;
