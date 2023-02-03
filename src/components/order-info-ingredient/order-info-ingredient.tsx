import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info-ingredient.module.css';
import { TIngredient } from '../../types';

type TOrderInfoIngredient = {
  ingredient: TIngredient | undefined
  count: number
}

// eslint-disable-next-line react/function-component-definition
const OrderInfoIngredient:FC<TOrderInfoIngredient> = ({ ingredient, count }) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (
    <div className={styles.order}>
      <div className={`${styles.icon}`}>
        <img className={`${styles.icon__image}`} src={ingredient!.image_mobile} alt="" />
      </div>
      <p className="text text_type_main-default">
        {ingredient!.name}
      </p>
      <div className={`${styles.priceContainer}`}>
        <p className="text text_type_digits-default">
          {count}
          {' '}
          x
          {' '}
          {ingredient!.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );

export default OrderInfoIngredient;
