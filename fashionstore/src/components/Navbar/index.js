import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { signOutUserStart } from "../../redux/User/user.actions";
import { checkUserIsAdmin } from "../../utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const isAdmin = checkUserIsAdmin(currentUser);

  const signOut = () => {
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
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="/search"> Search</Link>
            </li>
          </ul>
        </nav>
        <div className="callToActions">
          {currentUser && (
            <ul>
              {isAdmin && (
                <li>
                  <Link to="/admin">Admin panel</Link>
                </li>
              )}

              <li>
                <Link to="/dashboard">My account</Link>
              </li>
              <li>
                <span onClick={() => signOut()}>Logout</span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
