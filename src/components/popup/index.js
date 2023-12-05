import React from "react";
import PropTypes from "prop-types";
import './style.css'

function Popup({onPopupOpened, title, children}) {
  return (
    <div className='popup'>
      <div className='popup__container'>
        <div className='popup__head'>
          <h2 className='popup__title'>{title}</h2>
          <button className='popup__close-btn' onClick={onPopupOpened}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  )
}

Popup.propTypes = {
  title: PropTypes.string,
  onPopupOpened: PropTypes.func,
  children: PropTypes.node
};

Popup.defaultProps = {
  onPopupOpened: () => {},
}


export default React.memo(Popup)