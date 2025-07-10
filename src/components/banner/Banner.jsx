import React from "react";
import "./Banner.css";
import venom_img from "../../assets/venom.jpg";
import venom_logo from "../../assets/venom_logo.png";
import play_icon from "../../assets/play_icon.svg";
import info_icon from "../../assets/info_icon.svg";
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
        <div className="banner_buttons">
          <button className="btn">
            <img src={play_icon} alt="" />
            Play
          </button>
          <button className="btn dark">
            <img src={info_icon} alt="" />
            Mas Info
          </button>
        </div>
        <CardList/>
      </div>
    </div>
  );
};

export default Banner;
