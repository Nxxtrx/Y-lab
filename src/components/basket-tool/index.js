import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import Translate from "../translations";
import './style.css';
import { useLocation } from "react-router-dom";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const location = useLocation();

  return (
    <div className={cn()}>
      <span className={cn('label')}><Translate text='inCart'/>:</span>
      <span className={cn('total')}>
        {amount
          ?         <>
          {amount} <Translate text={plural(amount, { one: 'товар', few: 'товара', many: 'товаров' })} /> / {numberFormat(sum)} ₽
        </>
          : <Translate text="empty" />
        }
      </span>
      <button className={cn('btn', `${location.pathname === '/' ? '' : 'BasketTool-btn_type_cart'}`)} onClick={onOpen}><Translate text='move'/></button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
