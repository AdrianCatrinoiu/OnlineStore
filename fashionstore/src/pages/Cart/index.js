import React from "react";
import Checkout from "../../components/Checkout";
import WithAuth from "../../hoc/withAuth";
import MainLayout from "../../layouts/MainLayout";

const Cart = ({}) => {
  return (
    <WithAuth>
      <MainLayout>
        <div>
          <Checkout />
        </div>
      </MainLayout>
    </WithAuth>
  );
};

export default Cart;
