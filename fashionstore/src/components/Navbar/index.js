import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { signOutUserStart } from "../../redux/User/user.actions";
import { checkUserIsAdmin } from "../../utils";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";
import { emptyCart } from "../../redux/Cart/cart.actions";
const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumberCartItems: selectCartItemsCount(state),
});

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { currentUser, totalNumberCartItems } = useSelector(mapState);
  const isAdmin = checkUserIsAdmin(currentUser);

  const signOut = () => {
    dispatch(emptyCart());
    dispatch(signOutUserStart());
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Nortec Noir Logo" />
          </Link>
        </div>
        <nav>
          <ul>
            {isAdmin && (
              <li id={2}>
                <Link to="/admin">Admin panel</Link>
              </li>
            )}
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="/search"> Search</Link>
            </li>
          </ul>
        </nav>
        <div className="callToActions">
          <ul>
            {currentUser && [
              <li id={1}>
                <Link to="/cart">Your Cart({totalNumberCartItems})</Link>
              </li>,
              <li id={2}>
                <Link to="/dashboard">My account</Link>
              </li>,
              <li id={3}>
                <span onClick={() => signOut()}>Logout</span>
              </li>,
            ]}
          </ul>

          <ul>
            {!currentUser && [
              <li id={1}>
                <Link to="/register">Register</Link>
              </li>,

              <li id={2}>
                <Link to="/login">Login</Link>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
