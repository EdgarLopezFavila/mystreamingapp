import React, { useEffect, useRef, useState } from "react";
import "./CardList.css";
import Cards from "../cards/Cards";
import { movieApi } from '../../data/api_movies';

const IMAGE_URL_BASE_PATH = 'https://image.tmdb.org/t/p/w500';

const CardList = ({nameCategory, type}) => {
  const [dataMovies, setDataMovies] = useState([]);
  const cardsRef = useRef();
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const getInitialData = async () => {
    try {
      const movieList = await movieApi.getMovieList(type ? type : "now_playing");
      if (movieList){
        setDataMovies(movieList.results); 
      }
    } catch (error) {
      alert(error);
    }
    return true;
  }

  useEffect(() => {
    getInitialData();
    cardsRef.current.addEventListener("wheel", handleWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="title__cards">
      <h2>{nameCategory ? nameCategory : "En este momento"}</h2>
      <div className="card_list" ref={cardsRef}>
        {dataMovies?.map((movie, index) => {
          return (
            <Cards index={index} image={`${IMAGE_URL_BASE_PATH}`+movie.backdrop_path} title={movie.title} movieKey={movie.id}/>
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
