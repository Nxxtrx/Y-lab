import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemDescription from "../../components/item-description";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import MenuLayout from "../../components/menu-layout";
import './style.css'
import Preloader from "../../components/preloader";


function ItemPage() {
  const store = useStore()
  const productId = useParams()

  const [product, setProduct] = useState({})
  const [currentProduct, setCurrentProduct] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    if(productId) {
      setIsLoading(true)
      setCurrentProduct('')
      store.actions.catalog.loadItemToId(productId.itemId)
      .then(item => {
        setProduct({... item, madeIn: item.madeIn.title, madeInCode: item.madeIn.code, category: item.category.title});
        setCurrentProduct(item.title)
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false))

    }
  }, [productId.itemId])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return(
    <PageLayout >
      <Head title={currentProduct}/>
      <MenuLayout onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {isLoading ? <Preloader /> : <ItemDescription product={product} onAdd={callbacks.addToBasket} productId={productId.itemId}/>}
    </PageLayout>
  )
}

export default React.memo(ItemPage)