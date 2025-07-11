import React from "react";
import "./Banner.css";
import venom_img from "../../assets/venom.jpg";
import venom_logo from "../../assets/venom_logo.png";
import CardList from "../card_list/CardList";

const Banner = () => {
  return (
    <div className="banner">
      <img src={venom_img} alt="" className="banner__img" />
      <div className="banner__caption">
        <img src={venom_logo} alt="" className="banner__caption__img" />
        <p>
          Son perseguidos por fuerzas militares y criaturas alienígenas del
          mundo natal de Venom, lideradas por Knull, el creador de los
          simbiontes. Explora una relación tensa entre Eddie y Venom, culminando
          en una decisión difícil que pondrá fin a su vínculo.{" "}
        </p>
        <CardList/>
      </div>
    </div>
  );
};

export default Banner;
