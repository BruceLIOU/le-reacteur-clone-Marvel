import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ pagination, setPagination }) => {
  return (
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
      <div className="pageNumber">{pagination.skip / 10 + 1}</div>
      <div
        className="next"
        onClick={() => {
          const obj = { ...pagination };
          obj.skip += 10;
          setPagination(obj);
        }}
      >
        <FontAwesomeIcon icon="caret-right" />
      </div>
    </div>
  );
};

export default Pagination;
