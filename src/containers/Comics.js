import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../components/Loader";

const Comics = ({ value, userToken, apiUrl }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [pagination, setPagination] = useState({ skip: 0, limit: 14 });

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
              <div className="description">{comic.description}</div>
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

export default Comics;
