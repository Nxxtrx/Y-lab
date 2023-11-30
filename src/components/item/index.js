import React, {useState} from "react";
import PropTypes, { bool } from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    onAdd: () => {
      props.onAddItem(props.item.code)
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className="Item-price">{props.item.price} ₽</div>
      {props.item.count ?  <div className="Item-price">{props.item.count} шт</div> : ''}
      <div className='Item-actions'>
        {props.item.count
          ? <button className="Item-btn" onClick={callbacks.onDelete}>Удалить</button>
          : <button className="Item-btn" onClick={callbacks.onAdd}>Добавить</button>
        }

      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  isOpened: PropTypes.bool,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onAddItem: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
  onAddItem: () => {
  }
}

export default React.memo(Item);
