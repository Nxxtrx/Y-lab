import React, { useEffect, useState } from "react";
import PropTypes, { func } from 'prop-types';
import './style.css';
import CartCounter from "../cart-counter/index";

function Controls({onPopupOpened, shopCart}) {

  const[count, setCount] = useState(0)
  const[total, setTotal] = useState(0)

  useEffect(() => {
    if(shopCart.length > 0){
      setCount(() => shopCart.reduce((acc, curr) => {
        return acc + parseInt(curr.count)
      }, 0))

      setTotal(() => shopCart.reduce((acc, curr) => {
        return acc + curr.price * curr.count;
      }, 0));
    }else{
      setCount(0)
      setTotal(0)
    }

  }, [shopCart])

  return (
    <div className='Controls'>
      <CartCounter shopCart={shopCart} count={count} total={total}/>
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
