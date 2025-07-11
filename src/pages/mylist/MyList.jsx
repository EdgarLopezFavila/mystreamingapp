import React, { useEffect, useState } from "react";
import "./MyList.css";
import { movieApi } from "../../data/api_movies";
import { getBuyOrRentMovieByUser } from '../../data/firebase';
import { toast } from "react-toastify";
import CardGrid from "../../components/card_grid/CardGrid";
import caret_back from "../../assets/caret_lefth_icon.svg";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const navigate = useNavigate();
  const [listMovies, setListMovies] = useState([]);

  const getInitialData = async () => {
  try {
    const dataMyList = await getBuyOrRentMovieByUser();
    if (!dataMyList || dataMyList.length === 0) {
      throw new Error("No tienes películas en tu lista");
    }
    
    const movies = await getMovies(dataMyList);
    setListMovies(movies);
    
  } catch (error) {
    toast.error(error.message || "Error al cargar tus películas");
    setListMovies([]);
  }
};

  const getMovies = async (listMovies) => {
  try {
    const moviePromises = listMovies.map(async (element) => {
      const dataMovie = await movieApi.getMovieDetails(element.uidMovie);
      return dataMovie ? {
        id: dataMovie.id,
        poster_path: dataMovie.backdrop_path,
        title: dataMovie.title
      } : null;
    });

    const results = await Promise.all(moviePromises);
    return results.filter(movie => movie !== null);
  } catch (error) {
    toast.error("Error al obtener detalles de películas");
    return [];
  }
};

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mylist">
      <img src={caret_back} alt="" onClick={() => navigate("/")} />
      <div className="mylist__header">
        <h1>Mi Lista</h1>
      </div>
      <CardGrid listMovies={listMovies} />
    </div>
  );
};

export default MyList;
