import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../components/Loader";

const Characters = ({ apiUrl }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/characters`);
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="characters-container">
      {data.results.map((character) => {
        return (
          <div className="thumbnail" key={character._id}>
            <img
              src={
                character.thumbnail.path + "." + character.thumbnail.extension
              }
              alt={character.name}
            />
            <div className="icon-favorite">
              <FontAwesomeIcon
                icon="heart"
                title="Add your favorite"
                onClick={() => {
                  setFavorite(true);
                }}
              />
            </div>
            <div className="title">{character.name}</div>
            <div className="middle">
              <div className="description">{character.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Characters;
