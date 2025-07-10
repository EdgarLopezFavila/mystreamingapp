import React from "react";
import "./Cards.css";
import { Link } from "react-router-dom";

const Cards = ({index, image, title, movieKey}) => {
  return (
    <Link to={`/play/${movieKey}`} className="card" key={index}>
      <img src={image} alt=""/>
      <p>{title}</p>
    </Link>
  );
};

export default Cards;
