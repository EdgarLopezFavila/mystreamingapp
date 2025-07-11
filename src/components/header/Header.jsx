import React, { useRef } from "react";
import './Header.css'
import logo from '../../assets/Logo.png';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.svg';
import caret_down from '../../assets/caret_down_icon.svg';
import { signout } from "../../data/firebase";
import { useNavigate } from "react-router-dom";

const sections = [
    { path: "/", name: "Inicio", label: "home" },
    { path: "/mi-lista", name: "Mi lista", label: "mylist" },
    { path: "/explore", name: "Explorar", label: "language" },
  ];

const Header = () => {

  const navigate = useNavigate();
  const navRef = useRef();

  return (
    <nav className="nav" ref={navRef}>
      <div className="nav__left">
        <img src={logo} alt="" />
        <ul>
        {sections.map((section, i) => (
          <li key={i} onClick={() => navigate(section.path)}>
            {section.name}
          </li>
        ))}
      </ul>
      </div>
      <div className="nav__rigth">
        <img src={bell_icon} alt="" className="icon"/>
        <div className="nav__profile">
          <img src={profile_img} alt="" className="profile"/>
          <img src={caret_down} alt=""/>
          <div className="dropdown">
            <p onClick={() =>{signout()}}>Salir de Streaming App</p>
          </div>
        </div>
      </div>
    </nav> 
  );
};

export default Header;
