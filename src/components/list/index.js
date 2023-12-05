import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import CartItem from "../cart-item/index";
import './style.css';

function List({list, onDeleteItem, onAddItem}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {item.count ? <CartItem item={item} onDelete={onDeleteItem} />
          : <Item item={item} onAddItem={onAddItem} />
          }

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
