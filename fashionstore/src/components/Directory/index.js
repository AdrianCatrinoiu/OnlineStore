import React from "react";
import ShopMen from "../../assets/man.jpeg";
import ShopWoman from "../../assets/woman.jpeg";
import Nortec from "../../assets/nortecnoir_logo.png";
import "./styles.scss";
const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="landLogo">
          <img src={Nortec} alt="Nortec"></img>
        </div>
        <div
          className="item"
          style={{ backgroundImage: `url(${ShopMen})` }}
        ></div>
        <div
          className="item"
          style={{ backgroundImage: `url(${ShopWoman})` }}
        ></div>
      </div>
    </div>
  );
};

export default Directory;
