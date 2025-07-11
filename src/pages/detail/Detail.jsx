import React, { useEffect, useState } from "react";
import "./Detail.css";
import { useNavigate, useParams } from "react-router-dom";
import { movieApi } from "../../data/api_movies";
import caret_left_icon from "../../assets/caret_lefth_icon.svg";
import UiButton from "../../components/button/UiButton";
import { buyOrRentMovie, getBuyOrRentMovieById } from "../../data/firebase";

const IMAGE_URL_BASE_PATH = "https://image.tmdb.org/t/p/w500";

const Detail = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [movieData, setMovieData] = useState({
    backdrop_path: "",
    overview: "",
    genres: [],
    title: "",
    release_date: "",
  });
  const [alreadyMovie, setAlreadyMovie] = useState(false);

  const getInitialData = async () => {
    try {
      const data = await movieApi.getMovieDetails(id);
      if (data) {
        setMovieData(data);
        const dataBougthOrRentMovie = await getBuyOrRentMovieById(id);
        if (dataBougthOrRentMovie && dataBougthOrRentMovie.length > 0) {
          setAlreadyMovie(
            dataBougthOrRentMovie[0] &&
              (dataBougthOrRentMovie[0].status === "BUY" || dataBougthOrRentMovie[0].status === "RENT")
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGeneros = (data) => {
    let generos = "";
    data.genres.forEach((genero) => {
      generos = generos + genero.name + " ";
    });
    return generos.trim();
  };

  const buyRentMovie = async (flag) => {
    try {
      const data = await buyOrRentMovie(id, flag);
      if (data) {
        setAlreadyMovie(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="detail">
      <img
        src={caret_left_icon}
        alt=""
        onClick={() => {
          nav("/");
        }}
        className="detail__back"
      />
      <img
        src={`${IMAGE_URL_BASE_PATH}` + movieData?.backdrop_path}
        alt=""
        className="detail__img"
      />
      <div className="detal__buy">
        <p className="detal__buy--text">{movieData.title}</p>
        <p className="detal__buy--text">{movieData?.overview}</p>
        <p className="detal__buy--text">Fecha: {movieData.release_date}</p>
        <p className="detal__buy--text">Generos: {getGeneros(movieData)}</p>
        <div className="detal__buy--buttons">
          {alreadyMovie && (
            <UiButton
              text={"Reproducir"}
              type={""}
              handleClick={() => nav(`/play/${id}`)}
            />
          )}
          {!alreadyMovie && (
            <>
              <UiButton
                text={"Comprar"}
                type={""}
                handleClick={() => buyRentMovie(true)}
              />
              <UiButton
                text={"Rentar"}
                type={""}
                handleClick={() => buyRentMovie(false)}
                styleName={"button__yellow"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
