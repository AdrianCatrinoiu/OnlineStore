import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

import "./styles.scss";
const Products = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + "/search").then((response) => {
      setData(response.data);
    });
  }, []);

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
    return (
      <div className="products">
        <h1>No search results!</h1>
      </div>
    );
  }

  return (
    <div className="products">
      <h1>Browse products</h1>
      <div className="productResults">
        {data.map((product, index) => {
          const { name, price, image } = product;
          if (!image || !name || typeof price === "undefined") return null;
          const configProduct = {
            ...product,
          };
          return <Product key={index} {...configProduct} />;
        })}
      </div>
    </div>
  );
};

export default Products;
