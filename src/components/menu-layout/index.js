import React from "react";
import Menu from "../menu";
import BasketTool from "../basket-tool";
import PropTypes from 'prop-types';
import './style.css'

function MenuLayout({sum, amount, onOpen}) {
  return(
    <div className="menu-layout">
      <Menu />
      <BasketTool sum={sum} amount={amount} onOpen={onOpen} />
    </div>
  )
}

MenuLayout.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

MenuLayout.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default MenuLayout