import React from 'react';
import {translations} from '../../utils';
import { useLanguage } from '../../hooks/language-context';

const Translate = ({ text }) => {
  const { language } = useLanguage();

  return translations[language][text] || text;
};

export default Translate;