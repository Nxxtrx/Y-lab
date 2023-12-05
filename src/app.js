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
  const count = store.getCartTotal().count
  const total = store.getCartTotal().total


  React.useEffect(() => {
    if(isOpened) {
      document.body.style.overflow = 'hidden';

    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpened]);

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
    }, []),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onPopupOpened={callbacks.onPopupOpened} count={count} total={total}/>
      <List list={list} onAddItem={callbacks.onAddItem} />
      {isOpened ? <Cart onPopupOpened={callbacks.onPopupOpened} title={'Корзина'} shopCart={shopCart} total={total} onDelete={callbacks.onDeleteItem}/> : ''}
    </PageLayout>
  );
}

export default App;
