import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isOpened, setIsOpened] = useState(false)

  const list = store.getState().list;
  const shopCart = store.getState().shopCart;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onPopupOpened: useCallback(() => {
      setIsOpened(isOpened => !isOpened)
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onPopupOpened={callbacks.onPopupOpened} shopCart={shopCart}/>
      <List list={list}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}
            onAddItem={callbacks.onAddItem}
            isOpened={isOpened}
            />
      {isOpened ? <Cart shopCart={shopCart} onPopupOpened={callbacks.onPopupOpened} onDelete={callbacks.onDeleteItem}/> : ''}
    </PageLayout>
  );
}

export default App;
