import React from "react";
import ProductCard from "../../components/ProductCard";
import WithAuth from "../../hoc/withAuth";
import MainLayout from "../../layouts/MainLayout";
const ProductDetails = ({}) => {
  return (
    <WithAuth>
      <MainLayout>
        <div>
          <ProductCard />
        </div>
      </MainLayout>
    </WithAuth>
  );
};

export default ProductDetails;
