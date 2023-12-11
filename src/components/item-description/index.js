import React from "react";
import {numberFormat} from "../../utils";
import PropTypes from 'prop-types';
import './style.css'

function itemDescription({product, onAdd, productId}) {

  const callback = {
    onAddItem: (e) => onAdd(productId)
  }

  return (
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
      <button onClick={callback.onAddItem}>Добавить</button>
    </div>
  )
}

itemDescription.propTypes = {
  product: PropTypes.object,
  onAdd: PropTypes.func,
  productId: PropTypes.string
};

itemDescription.defaultProps = {
  onAdd: (_id) => {},
}

export default React.memo(itemDescription)