import React, { useEffect, useState } from 'react';
import './Played.css';
import caret_left_icon from '../../assets/caret_lefth_icon.svg'
import { movieApi } from '../../data/api_movies';
import { useNavigate, useParams } from 'react-router-dom';

const BASE_URL_VIDEO = "https://www.youtube.com/embed/";

const Played = () => {

  const {id} = useParams(); 
  const nav = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const getInitialData = async () =>{
    try {
      const responseMovie = await movieApi.getVideoById(id);
      if (responseMovie) {
        setMovieData(responseMovie.results[0]);
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="played">
      <img src={caret_left_icon} alt="" onClick={() => {nav(-2)}}/>
      <iframe width={'90%'} height={'90%'} src={`${BASE_URL_VIDEO}${movieData.key}`} frameborder="0" title='Trailer' allowFullScreen></iframe>
      <div className="played__info">
        <p>{movieData.published_at.slice(0,10)}</p>
        <p>{movieData.name}</p>
        <p>{movieData.type}</p>
      </div>
    </div>
  );
};

export default Played;