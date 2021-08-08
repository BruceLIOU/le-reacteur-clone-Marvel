import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const Comics = ({ value, userToken, apiUrl }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [pagination, setPagination] = useState({ skip: 0, limit: 100 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/comics?skip=${pagination.skip}&limit=${pagination.limit}&title=${value}`
        );
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
              <div className="description">
                {comic.description.substring(0, 400) + "..."}
              </div>
            </div>
          </div>
        );
      })}
      {data.count > 100 && (
        <Pagination pagination={pagination} setPagination={setPagination} />
      )}
    </div>
  );
};

export default Comics;
