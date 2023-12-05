import React, { useEffect, useState } from "react";
import PropTypes, { func } from 'prop-types';
import './style.css';
import CartCounter from "../cart-counter/index";

function Controls({onPopupOpened, count, total}) {
  return (
    <div className='Controls'>
      <CartCounter count={count} total={total}/>
      <button className="Controls__btn" onClick={() => onPopupOpened()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  shopCart: PropTypes.array,
  onPopupOpened: PropTypes.func
};

Controls.defaultProps = {
  onPopupOpened: () => {}
}

export default React.memo(Controls);
