import React, { useState } from "react";
import "./Explorar.css";
import SearchBar from "../../components/searchbar/SearchBar";
import UiButton from "../../components/button/UiButton";
import { movieApi } from "../../data/api_movies";
import { toast } from "react-toastify";
import CardGrid from "../../components/card_grid/CardGrid";
import caret_back from "../../assets/caret_lefth_icon.svg";
import { useNavigate } from "react-router-dom";

const Explorar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [listMovies, setListMovies] = useState([]);

  const onHandleSearch = async () => {
    try {
      const dataMovies = await movieApi.searchMovies(query);
      if (dataMovies && dataMovies.results.length > 0) {
        setListMovies(dataMovies.results);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Sin resultados");
    }
  };

  return (
    <div className="explorer">
      <img src={caret_back} alt="" onClick={() => navigate("/")} />
      <div className="explorer__header">
        <h1>Explorar</h1>
        <SearchBar
          value={query}
          handleChange={(e) => setQuery(e.target.value)}
        />
        <UiButton
          text={"Explorar"}
          type={""}
          handleClick={() => onHandleSearch(true)}
          styleName={"button__red"}
        />
      </div>
      <CardGrid listMovies={listMovies} />
    </div>
  );
};

export default Explorar;
