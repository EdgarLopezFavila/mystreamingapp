import React from 'react';
import './UiButton.css';

const UiButton = ({text, styleName, handleClick, type}) => {
  return (
    <button className={styleName ? styleName : 'button__main'} 
      onClick={handleClick} type={type ? type : "submit"}>{text}</button>
  );
};

export default UiButton;