import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onDeleteItem, onSelectItem, onAddItem, isOpened}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onDelete={onDeleteItem} onSelect={onSelectItem} onAddItem={onAddItem} isOpened={isOpened} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  isOpened: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  onAddItem: PropTypes.func
};

List.defaultProps = {
  onDeleteItem: () => {
  },
  onSelectItem: () => {
  },
  onAddItem: () => {
  },
}

export default React.memo(List);
