import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import { parseDate } from '../../utils/utils';
import styles from './order-item.module.css';
import { MAX_INGREDIENTS } from '../../utils/constants';
import { TOrder } from '../../types';
import { useSelector } from '../../hooks';

type TOrdersItem = {
  order: TOrder
}

// eslint-disable-next-line react/function-component-definition
const OrdersItem:FC<TOrdersItem> = ({ order }) => {
  const location = useLocation();

  const ingredientsToDraw = order.ingredients.slice(0, MAX_INGREDIENTS);
  const orderIngredientsCount = order.ingredients.length;
  const count = orderIngredientsCount - MAX_INGREDIENTS;

  const allIngredients = useSelector((store) => store.ingredients.ingredients);

  return (
    allIngredients!.length !== 0
      ? (
        // eslint-disable-next-line no-underscore-dangle
        <Link className={styles.link} to={{ pathname: location.pathname === '/feed' ? `/feed/${order._id}` : `/profile/orders/${order._id}`, state: { background: location, orderItem: order } }}>
          <div className={`${styles.item} pl-6 pr-6 pt-6 pb-6`}>
            <div className={`${styles.title}`}>
              <h2 className="text text_type_digits-default">
                {order.number}
              </h2>
              <p className={`${styles.date} text text_type_main-default`}>
                {parseDate(order.createdAt)}
              </p>
            </div>
            <h3 className="text text_type_main-medium mt-6">
              {order.name}
            </h3>
            <div className={`${styles.totalIngredientPrice} mt-6`}>
              <div className={`${styles.icons}`}>
                {ingredientsToDraw.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className={`${styles.icon}`}>
                    {index === 5 && (
                    <>
                      <div className={`${styles.icon__overlay}`} />
                      <span className={`${styles.hiddenIngredientsCount} text text_type_digits-default`}>
                        +
                        {count}
                      </span>
                    </>
                    )}
                    <img
                      className={`${styles.icon__image}`}
                      /* eslint-disable-next-line no-underscore-dangle */
                      src={allIngredients!.find((el) => el._id === item)?.image_mobile}
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <div className={`${styles.price}`}>
                <p className="text text_type_digits-default mr-2">
                  {order.ingredients.reduce((acc, ingredientId) => {
                    // eslint-disable-next-line no-underscore-dangle,max-len
                    const newAcc = acc + allIngredients!.find((el) => ingredientId === el._id)!.price;
                    return newAcc;
                  }, 0)}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </Link>
      )

      : null
  );
};

export default OrdersItem;
