import React from "react";
import "./CardGrid.css";
import Cards from "../cards/Cards";

const IMAGE_URL_BASE_PATH = "https://image.tmdb.org/t/p/w500";

const CardGrid = ({ listMovies }) => {
  return (
    <div className="card__grid">
      <h2>Resultados</h2>
      <div className="card__grid__list">
        {listMovies?.map((movie, index) => {
          return (
            <Cards
              index={index}
              image={`${IMAGE_URL_BASE_PATH}` + movie.poster_path}
              title={movie.title}
              movieKey={movie.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardGrid;
