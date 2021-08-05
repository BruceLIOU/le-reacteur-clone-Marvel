import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../components/Loader";

const Comics = ({ apiUrl }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comics`);
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
    <div className="comics-container">
      {data.results.map((comic) => {
        return (
          <div className="thumbnail" key={comic._id}>
            <img
              src={comic.thumbnail.path + "." + comic.thumbnail.extension}
              alt={comic.name}
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
            <div className="title">{comic.title}</div>
            <div className="middle">
              <div className="description">{comic.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comics;
