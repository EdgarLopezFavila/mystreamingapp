import React, { useEffect, useRef } from "react";
import './Header.css'
import logo from '../../assets/Logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.svg';
import caret_down from '../../assets/caret_down_icon.svg';
import { signout } from "../../data/firebase";

const sections = [
    { path: "/", name: "Inicio", label: "home" },
    { path: "/series", name: "Series", label: "series" },
    { path: "/peliculas", name: "Peliculas", label: "movies" },
    { path: "/mi-lista", name: "Mi lista", label: "mylist" },
    { path: "/idiomas", name: "Explorar por Idiomas", label: "language" },
  ];

const Header = () => {

  const navRef = useRef();

  useEffect(() => {
    console.log("useEffect");
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav__dark')
      } else {
        navRef.current.classList.remove('nav__dark')
      }
    });
  }, []);

  return (
    <nav className="nav" ref={navRef}>
      <div className="nav__left">
        <img src={logo} alt="" />
        <ul>
        {sections.map((section, i) => (
          <li key={i}>
            {/**<a href={section.path}>{section.name}</a>**/}
            {section.name}
          </li>
        ))}
      </ul>
      </div>
      <div className="nav__rigth">
        <img src={search_icon} alt="" className="icon"/>
        <p>Children</p>
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
