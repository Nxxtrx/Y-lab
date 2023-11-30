import React from 'react'
import './style.css'
import List from '../list/index';
import PropTypes from 'prop-types';

function Cart({shopCart, onPopupOpened, onDelete}) {
  return(
    <div className='cart-popup'>
      <div className='cart-popup__container'>
        <div className='cart-popup__head'>
          <h2 className='cart-popup__title'>Корзина</h2>
          <button className='cart-popup__close-btn' onClick={onPopupOpened}>Закрыть</button>
        </div>
        <List list={shopCart} onDeleteItem={onDelete}/>
        <p className='cart-popup__check'>Итого
          <span className='cart-popup__check-count'>{shopCart.reduce((acc, curr) => acc + curr.price * curr.count, 0)} ₽</span>
        </p>
      </div>
    </div>
  )
}

Cart.propTypes = {
  shopCart: PropTypes.array,
  onPopupOpened: PropTypes.func,
  onDelete: PropTypes.func
};

Cart.defaultProps = {
  onPopupOpened: () => {},
  onDelete: () => {}
}

export default React.memo(Cart);