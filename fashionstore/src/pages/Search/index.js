import React from "react";
import Products from "../../components/Products";
import MainLayout from "../../layouts/MainLayout";

const Search = () => {
  return (
    <MainLayout>
      <div className="searchPage">
        <Products />
      </div>
    </MainLayout>
  );
};

export default Search;
