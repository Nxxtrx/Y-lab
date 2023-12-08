import {memo} from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../hooks/language-context";
import Translate from "../translations";
import './style.css';


function Head({title}) {

  const { language, changeLanguage } = useLanguage();

  return (
    <div className='Head'>
      <h1><Translate text={title} /></h1>
      <div className="Head__lang">
        <button className="Head__btn" onClick={() => changeLanguage('ru')} disabled={language === 'ru'}>Русский</button>
        <button className="Head__btn" onClick={() => changeLanguage('en')} disabled={language === 'en'}>English</button>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
