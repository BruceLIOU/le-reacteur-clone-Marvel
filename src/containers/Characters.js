import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";

import Loader from "../components/Loader";

const Characters = ({ value, userToken, apiUrl }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/characters?skip=${pagination.skip}&limit=${pagination.limit}&name=${value}`
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [pagination.skip, pagination.limit, value, apiUrl]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="characters-container">
      {data.results.map((character) => {
        return (
          <div
            className="thumbnail"
            key={character._id}
            onClick={() => {
              history.push(`/comics/${character._id}`);
            }}
          >
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
      <div className="pagination">
        {pagination.skip >= 10 && (
          <div
            className="previous"
            onClick={() => {
              const obj = { ...pagination };
              obj.skip -= 10;
              setPagination(obj);
            }}
          >
            <FontAwesomeIcon icon="caret-left" />
          </div>
        )}
        <div className="pageNumbers">
          {pagination.skip === 0 ? 1 : pagination.skip / 10}
        </div>
        <div
          className="previous"
          onClick={() => {
            const obj = { ...pagination };
            obj.skip += 10;
            setPagination(obj);
          }}
        >
          <FontAwesomeIcon icon="caret-right" />
        </div>
      </div>
    </div>
  );
};

export default Characters;
