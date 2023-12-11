import React, {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import MenuLayout from '../../components/menu-layout/index.js';
import Preloader from '../../components/preloader/index.js';

function Main() {

  const itemPerPage = 10;

  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)


  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    setIsLoading(true)
    store.actions.catalog.load(10, currentPage).finally(() => setIsLoading(false))
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
      <Head title={'title'}/>
      <MenuLayout onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      {isLoading ? <Preloader/> : <List list={select.list} renderItem={renders.item}/>}
      <Pagination itemPerPage={itemPerPage} totalItem={select.count} paginate={paginate} currentPage={currentPage}/>
    </PageLayout>

  );
}

export default memo(Main);
