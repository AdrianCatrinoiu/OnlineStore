import React from "react";
import ShopMen from "../../assets/man.jpeg";
import ShopWoman from "../../assets/woman.jpeg";
import Nortec from "../../assets/nortecnoir_logo.png";
import { Link } from "react-router-dom";
import "./styles.scss";
const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="landLogo">
          <img src={Nortec} alt="Nortec"></img>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopMen})` }}>
          <Link to="/search/M">Shop Mens</Link>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopWoman})` }}>
          <Link to="/search/W">Shop Womens</Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
