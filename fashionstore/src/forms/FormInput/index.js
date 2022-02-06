import React from "react";
import "./styles.scss";

const FormInput = ({ handleChange, label, ...other }) => {
  return (
    <div className="formRow">
      {label && <label>{label}</label>}
      <input className="formInput" onChange={handleChange} {...other}></input>
    </div>
  );
};

export default FormInput;
