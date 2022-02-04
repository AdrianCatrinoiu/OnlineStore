import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addEventListener("resize", handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener("resize", handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
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
          <div className="callToActions">
            {(!isSmallScreen || isNavVisible) && (
              <>
                <Link to="/"> Home</Link>
                <Link to="/search"> Browse</Link>
              </>
            )}
          </div>
          <span onClick={toggleNav} className="burgerMenu">
            ≡
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
