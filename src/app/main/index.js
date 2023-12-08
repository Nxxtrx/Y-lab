import React, {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { Route, Routes, useLocation } from 'react-router';
import ItemPage from '../../components/item-page/index.js';

function Main() {

  const itemPerPage = 10;

  const [currentPage, setCurrentPage] = React.useState(1)
  const [currentProduct, setCurrentProduct] = React.useState('')

  const store = useStore();

  const location = useLocation()

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.actions.catalog.load(10, currentPage);
  }, [currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <PageLayout>
      <Head title={`${location.pathname== '/' ? 'title' : currentProduct}`}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <Routes>
        <Route path='/' element={<List list={select.list} renderItem={renders.item}/>}/>
        <Route path='/item/:itemId' element={<ItemPage onAdd={callbacks.addToBasket} setCurrentProduct={setCurrentProduct}/>}/>
      </Routes>
      {location.pathname === '/' && <Pagination itemPerPage={itemPerPage} totalItem={select.count} paginate={paginate} currentPage={currentPage}/>}
    </PageLayout>

  );
}

export default memo(Main);
