import React from "react";
import './style.css';
import PropTypes from 'prop-types';
import { plural } from "../../utils";

function CartCounter({count, total}) {
  return (
    <div className="cart-counter">
    <p className="cart-counter__text">В корзине:
      <span className="cart-counter__count">{count === 0 ? 'пусто' : `${count} ${plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${total.toLocaleString('ru-RU')} ₽`}</span>
    </p>
  </div>
  )
}

CartCounter.propTypes = {
  shopCart: PropTypes.array,
  onPopupOpened: PropTypes.func
};

export default React.memo(CartCounter)