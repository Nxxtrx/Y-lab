import React, { useEffect } from 'react'
import propTypes from 'prop-types';
import PropTypes from "prop-types";
import './style.css'

function Pagination({itemPerPage, totalItem, paginate, currentPage}) {
  const pageNumber = []

  const [neighborPages, setNeighborPages] = React.useState([2, 3])

  for(let i = 1; i <= Math.ceil(totalItem / itemPerPage); i ++) {
    pageNumber.push(i)
  }

  const lastPage = pageNumber.length

  useEffect(() => {
    switch (true) {
      case (currentPage >= 4 && currentPage <= lastPage - 3 && lastPage >= 8):
        setNeighborPages(pageNumber.slice(currentPage - 2, currentPage + 1));
        break;

      case (currentPage < 3 && lastPage >= 8):
        setNeighborPages(pageNumber.slice(1, 3));
        break;

      case (currentPage === 3 && lastPage >= 8):
        setNeighborPages(pageNumber.slice(1, 4));
        break;

      case (currentPage === lastPage - 2 && lastPage >= 8):
        setNeighborPages(pageNumber.slice(lastPage - 4, lastPage - 1));
        break;

      case (currentPage > lastPage - 2 && lastPage >= 8):
        setNeighborPages(pageNumber.slice(lastPage - 3, lastPage - 1));
        break;

      case (lastPage < 8):
        setNeighborPages(pageNumber.slice(1, lastPage-1))
      default:
        break;
    }
  }, [currentPage, lastPage])

  return (
    <ul className="pagination">
      <li className="pagination__item" key={1}>
        <button
          className={`pagination__btn ${currentPage === 1 ? "pagination__btn_type_active" : ""}`}
          onClick={() => paginate(1)}
        >
          {1}
        </button>
      </li>

      {currentPage >= 4 && lastPage >= 8 && <li className="pagination__ellipsis">...</li>}

      {neighborPages.map((item, index) => (
        <li className="pagination__item" key={index + 1}>
          <button
            className={`pagination__btn ${currentPage === item ? "pagination__btn_type_active" : ""}`}
            onClick={() => paginate(item)}
          >
            {item}
          </button>
        </li>
      ))}

      {currentPage <= lastPage - 3 && lastPage >= 8 && <li className="pagination__ellipsis">...</li>}

      <li className="pagination__item" key={pageNumber.length}>
        <button
          className={`pagination__btn ${currentPage === pageNumber.length ? "pagination__btn_type_active" : ""}`}
          onClick={() => paginate(pageNumber.length)}
        >
          {pageNumber.length}
        </button>
      </li>
    </ul>
  );
}

Pagination.propTypes = {
  itemPerPage: PropTypes.number,
  totalItem: PropTypes.number,
  paginate: PropTypes.func,
  currentPage: PropTypes.number,
}

Pagination.defaultProps = {
  paginate: (item) => {},
}

export default React.memo(Pagination)