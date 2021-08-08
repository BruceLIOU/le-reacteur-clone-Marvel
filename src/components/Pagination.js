import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ pagination, setPagination }) => {
  return (
    <div className="pagination">
      {pagination.skip >= 10 && (
        <div
          className="previous"
          onClick={() => {
            const obj = { ...pagination };
            obj.skip -= pagination.limit;
            setPagination(obj);
          }}
        >
          <FontAwesomeIcon icon="caret-left" />
        </div>
      )}
      <div className="pageNumber">{pagination.skip / pagination.limit + 1}</div>
      <div
        className="next"
        onClick={() => {
          const obj = { ...pagination };
          obj.skip += pagination.limit;
          setPagination(obj);
        }}
      >
        <FontAwesomeIcon icon="caret-right" />
      </div>
    </div>
  );
};

export default Pagination;
