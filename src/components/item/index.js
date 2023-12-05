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
      <div className="Item-price">{props.item.price.toLocaleString('ru-RU')} ₽</div>
      <button className="Item-btn__add" onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddItem: PropTypes.func
};

Item.defaultProps = {
  onAddItem: () => {
  }
}

export default React.memo(Item);
