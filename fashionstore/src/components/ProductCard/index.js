import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import {
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.actions";
import Button from "../../forms/Button";
const mapState = ({ productsData }) => ({
  product: productsData.product,
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product } = useSelector(mapState);
  const { name, image, price, description } = product;
  useEffect(() => {
    dispatch(fetchProductStart(id));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const configAddToCartBtn = {
    type: "button",
  };
  return (
    <div className="productCard">
      <div className="leftProductCard">
        <div className="hero">
          <img src={process.env.REACT_APP_BASE_URL + image} alt={name}></img>
        </div>
        <div className="productDetails">
          <ul>
            <li>
              <h1>{name}</h1>
            </li>
            <li>
              <span>${price}</span>
            </li>
            <li>
              <div className="addToCard">
                <Button {...configAddToCartBtn}>
                  <span>Add to cart</span>
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="rightProductCard">
        <span className="description">{description}</span>
      </div>
    </div>
  );
};
export default ProductCard;
