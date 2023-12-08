import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import Translate from "../translations";
import './style.css';
import { Link } from "react-router-dom";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to={'/'} className={cn('link')}><Translate text='main'/></Link>
      <span className={cn('label')}><Translate text='inCart'/>:</span>
      <span className={cn('total')}>
        {amount
          ?         <>
          {amount} <Translate text={plural(amount, { one: 'товар', few: 'товара', many: 'товаров' })} /> / {numberFormat(sum)} ₽
        </>
          : <Translate text="empty" />
        }
      </span>
      <button onClick={onOpen}><Translate text='move'/></button>
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
