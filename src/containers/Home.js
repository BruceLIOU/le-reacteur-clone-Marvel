import { useState } from "react";
import spiderman from "../assets/img/spider-man.png";
import shangchi from "../assets/img/shangchi.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import Loader from "../components/Loader";

const Home = () => {
  const [isLoading] = useState(false);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="home-container">
      <div className="home-description">
        Marvel Entertainment, LLC, a wholly-owned subsidiary of The Walt Disney
        Company, is one of the world's most prominent character-based
        entertainment companies, built on a proven library of more than 8,000
        characters featured in a variety of media over seventy-five years.
        Marvel utilizes its character franchises in entertainment, licensing and
        publishing. For more information visit marvel.com. © 2020 MARVEL
      </div>

      <Carousel
        autoPlay={true}
        showThumbs={false}
        autoFocus={true}
        showStatus={false}
        className="home-carousel"
      >
        <div>
          <img src={spiderman} alt="SpiderMan" />
          <p className="legend">SpiderMan</p>
        </div>
        <div>
          <img src={shangchi} alt="Shangchi" />
          <p className="legend">Shangchi</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
