import React from "react";
import { useNavigate } from "react-router";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import Button from "../../forms/Button";
import CartItem from "../CartItem";
import { emptyCart } from "../../redux/Cart/cart.actions";
const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const Checkout = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, total } = useSelector(mapState);
  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <table
                  className="checkoutHeader"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </tbody>
                </table>
              </tr>
              <tr>
                <table border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                    {cartItems.map((item, pos) => {
                      return (
                        <tr key={pos}>
                          <td>
                            <CartItem {...item} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </tr>

              <tr>
                <table align="right" border="0" cellSpacing="0" cellPadding="0">
                  <tr>
                    <td>
                      <h3>Total: ${total}</h3>
                    </td>
                  </tr>
                </table>
              </tr>

              <tr>
                <table border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        <Button>
                          <span onClick={() => navigate(-1)}>
                            Continue Shopping
                          </span>
                        </Button>
                      </td>
                      <td>
                        <Button>
                          <span onClick={() => dispatch(emptyCart())}>
                            Checkout
                          </span>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>You have no items in your shopping cart!</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
