import React from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Banner from '../../components/banner/Banner';
import CardList from '../../components/card_list/CardList';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div className="home">
      <Header/>
      <Banner/>
      <div className="more__titles">
        <CardList nameCategory={"Lo mas top"} type={"top_rated"}/>
        <CardList nameCategory={"Recientes"} type={"upcoming"}/>
        <CardList nameCategory={"Lo mas popular"} type={"popular"}/>
        <CardList nameCategory={"Para ti"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;