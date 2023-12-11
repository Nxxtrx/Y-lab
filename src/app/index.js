import {useCallback, useContext, useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import ItemPage from './item-page/index';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      {activeModal === 'basket' && <Basket/>}
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/item/:itemId' element={<ItemPage />}/>
      </Routes>
    </>
  );
}

export default App;
