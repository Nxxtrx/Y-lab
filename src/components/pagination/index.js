import React, { useEffect } from 'react'
import propTypes from 'prop-types';
import PropTypes from "prop-types";
import './style.css'

function Pagination({itemPerPage, totalItem, paginate, currentPage}) {
  const pageNumber = []

  const [neighborPages, setNeighborPages] = React.useState([2, 3, 4])

  for(let i = 1; i <= Math.ceil(totalItem / itemPerPage); i ++) {
    pageNumber.push(i)
  }

  useEffect(() => {
    if(currentPage >= 4 && currentPage <= 52) {
      setNeighborPages(pageNumber.slice(currentPage - 2, currentPage + 1))
    } else if (currentPage < 4) {
      setNeighborPages([2, 3, 4])
    } else if (currentPage >= 53){
      setNeighborPages([52, 53, 54])
    }
  }, [currentPage])

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

      {currentPage >= 4 && <li className="pagination__ellipsis">...</li>}

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

      {currentPage <= 52 && <li className="pagination__ellipsis">...</li>}

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