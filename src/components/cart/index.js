import React from 'react'
import './style.css'
import Popup from '../popup/index';
import List from '../list/index';
import PropTypes from 'prop-types';

function Cart({onPopupOpened, title, shopCart, total, onDelete}) {
  return(
    <Popup onPopupOpened={onPopupOpened} title={title}>
      <List list={shopCart} onDeleteItem={onDelete}/>
      <p className='cart-popup__check'>Итого
       <span className='cart-popup__check-count'>{total.toLocaleString('ru-RU')} ₽</span>
      </p>
    </Popup>
  )
}

Cart.propTypes = {
  title: PropTypes.string,
  total: PropTypes.number,
  shopCart: PropTypes.array,
  onPopupOpened: PropTypes.func,
  onDelete: PropTypes.func
};

Cart.defaultProps = {
  onPopupOpened: () => {},
  onDelete: () => {}
}

export default React.memo(Cart);