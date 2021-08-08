import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const Characters = ({ value, userToken, apiUrl }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ skip: 0, limit: 100 });
  const [favorite, setFavorite] = useState([]);
  const [count, setCount] = useState(0);

  const handleAddFav = async (id) => {
    try {
      const response = await axios.post(
        `${apiUrl}/user/addFavorites`,
        {
          id: id,
          token: userToken,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response);
      setFavorite([...favorite, id]);
    } catch (error) {
      console.log(error.message);
    }
    console.log(favorite);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/characters?skip=${pagination.skip}&limit=${pagination.limit}&name=${value}`
        );
        //console.log(response.data);
        setData(response.data);
        setCount(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [pagination.skip, pagination.limit, value, apiUrl, count]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="characters-container">
      {data.results.map((character) => {
        return (
          <div className="thumbnail" key={character._id}>
            <Link to={`/comic/${character._id}`}>
              <img
                src={
                  character.thumbnail.path + "." + character.thumbnail.extension
                }
                alt={character.name}
              />
            </Link>
            <div className="icon-favorite">
              {favorite ? (
                <FontAwesomeIcon
                  icon="heart"
                  title="Add your favorite"
                  color="white"
                  onClick={() => handleAddFav(character)}
                />
              ) : (
                <FontAwesomeIcon
                  icon="heart"
                  title="Add your favorite"
                  color="red"
                />
              )}
            </div>
            <div className="title">{character.name}</div>
            <div className="middle">
              <div className="description">{character.description}</div>
            </div>
          </div>
        );
      })}
      <Pagination pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default Characters;
