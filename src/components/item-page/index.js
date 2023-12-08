import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useStore from "../../store/use-store";
import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import './style.css'

function ItemPage({onAdd, setCurrentProduct}) {
  const store = useStore()
  const productId = useParams()

  const [product, setProduct] = useState([])


  const callbacks = {
    onAddItem: (e) => onAdd(productId.itemId)
  }

  useEffect(() => {
    if(productId) {
      setCurrentProduct('')
      store.actions.catalog.loadItemToId(productId)
      .then(item => {
        setProduct({... item, madeIn: item.madeIn.title, madeInCode: item.madeIn.code, category: item.category.title});
        setCurrentProduct(item.title)
      })
      .catch(error => {
        console.log(error);
      });

    }
  }, [productId.itemId])



  return(
    <div className="product">
      <p className="product__description">{product.description}</p>
      <p className="product__description">Страна производитель:&nbsp;
        <span className="product__description product__description_type_bold">{product.madeIn} ({product.madeInCode})</span>
      </p>
      <p className="product__description">Категория:&nbsp;
        <span className="product__description product__description_type_bold">{product.category}</span>
      </p>
      <p className="product__description">Год выпуска:&nbsp;
        <span className="product__description product__description_type_bold">{product.edition}</span>
      </p>
      <p className="product__price">Цена:
        <span className="product__total">{numberFormat(product.price)} ₽</span>
      </p>
      <button onClick={callbacks.onAddItem}>Добавить</button>
    </div>
  )
}

ItemPage.propTypes = {
  onAdd: PropTypes.func
};

ItemPage.defaultProps = {
  onAdd: (_id) => {},
}

export default React.memo(ItemPage)