import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./../../forms/Button/Button";
import "./styles.scss";

const Product = (product) => {
  const { id, name, price, image } = product;
  useEffect(() => {}, []);
  if (!id || !image || !name || typeof price === "undefined") return null;

  const configAddToCartBtn = {
    type: "button",
  };
  const handleAddToCart = (product) => {
    if (!product) return;
    return;
  };
  return (
    <div className="product">
      <div className="image">
        <Link to={`/product/${id}`}>
          <img src={process.env.REACT_APP_BASE_URL + image} alt={name} />
        </Link>
      </div>

      <div className="details">
        <ul>
          <li>
            <Link to={`/product/${id}`}>
              <span>{name}</span>
            </Link>
          </li>
          <li>
            <span>€{price}</span>
          </li>
          <div className="addToCart">
            <li>
              <Button {...configAddToCartBtn}>
                <span onClick={() => handleAddToCart(product)}>
                  Add to cart
                </span>
              </Button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Product;
