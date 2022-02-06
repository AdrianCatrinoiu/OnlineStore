import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./../../forms/Button";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/Cart/cart.actions";

const Product = (product) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sku, name, price, image } = product;
  if (!sku || !image || !name || typeof price === "undefined") return null;

  const configAddToCartBtn = {
    type: "button",
  };
  const handleAddToCart = (product) => {
    if (!product) return;

    dispatch(addProduct(product));
    navigate("/cart");
  };
  return (
    <div className="product">
      <div className="image">
        <Link to={`/product/${sku}`}>
          <img src={process.env.REACT_APP_BASE_URL + image} alt={name} />
        </Link>
      </div>

      <div className="details">
        <ul>
          <li>
            <Link to={`/product/${sku}`}>
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
