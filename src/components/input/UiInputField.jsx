import React from 'react';
import './UiInputField.css';

const UiInputField = ({type, placeholder, styleName, value, handleChange, name}) => {
  return (
    <input type={type} placeholder={placeholder} className={styleName ? styleName : "input__main"}
      value={value} onChange={handleChange}/>
  );
};

export default UiInputField;