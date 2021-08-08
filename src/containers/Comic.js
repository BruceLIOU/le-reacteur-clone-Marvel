import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const Comic = ({ setToken, apiUrl }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const [pagination, setPagination] = useState({ skip: 0, limit: 100 });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comics/${id}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        console.log(error);
      }
    };
    fetchData();
  }, [id, apiUrl]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="comics-container">
      <p>
        Comics with&nbsp;
        <span>{data.name}</span>
      </p>
      {data.comics &&
        data.comics.map((comic) => {
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
      <Pagination pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default Comic;
