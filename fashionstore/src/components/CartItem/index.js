import React from "react";
import "./styles.scss";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "../../redux/Cart/cart.actions";

const Item = (product) => {
  const dispatch = useDispatch();
  const { name, image, price, quantity, id } = product;
  const handleRemoveCartItem = (id) => {
    dispatch(
      removeCartItem({
        id,
      })
    );
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };
  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };
  return (
    <table className="cartItem" border="0" cellSpacing="0" cellPadding="0">
      <tbody>
        <tr>
          <td>
            <img src={image} alt={name} />
          </td>
          <td>{name}</td>
          <td>
            <span
              className="cartBtn"
              onClick={() => handleReduceItem(product)}
            >{`<`}</span>
            <span>{quantity}</span>
            <span
              className="cartBtn"
              onClick={() => handleAddProduct(product)}
            >{`>`}</span>
          </td>
          <td>${price}</td>
          <td align="center">
            <span className="cartBtn" onClick={() => handleRemoveCartItem(id)}>
              X
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;
