import React from "react";
import './style.css';
import PropTypes from 'prop-types';
import { plural } from "../../utils";

function CartCounter({shopCart, count, total}) {
  return (
    <div className="cart-counter">
    <p className="cart-counter__text">В корзине:
      <span className="cart-counter__count">{shopCart.length === 0 ? 'Пусто' : `${count} ${plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${total} ₽`}</span>
    </p>
  </div>
  )
}

CartCounter.propTypes = {
  shopCart: PropTypes.array,
  onPopupOpened: PropTypes.func
};

export default React.memo(CartCounter)