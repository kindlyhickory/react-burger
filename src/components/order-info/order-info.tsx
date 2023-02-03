import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.css';
// eslint-disable-next-line import/extensions
import OrderInfoIngredient from '../order-info-ingredient/order-info-ingredient';
// eslint-disable-next-line import/extensions
import { parseDate } from '../../utils/utils';
import { useSelector } from '../../hooks';

// eslint-disable-next-line react/function-component-definition
const OrderInfo:FC = () => {
  const { id } = useParams<{id: string}>();
  const { orders } = useSelector((store) => store.ws);
  // eslint-disable-next-line no-underscore-dangle
  const order = orders.find((el) => el._id === id);
  const allIngredients = useSelector((store) => store.ingredients.ingredients);
  // console.log(order);
  // console.log(id);
  const resultOrder = { ...order };
  const result = resultOrder?.ingredients?.reduce<Record<string, number>>((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
  return (
    order && allIngredients!.length !== 0
      ? (
        <div className={styles.infoContainer}>
          <p className={`${styles.title} text text_type_main-medium mb-2`}>
            {order.name}
          </p>
          <p className={`${styles.status} text text_type_main-default mb-15`}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {order.status === 'done' ? 'Выполнено'
              : order.status === 'pending' ? 'Готовится'
                : null}
          </p>
          <div>
            <p className="text text_type_main-medium mb-6">
              Состав
            </p>
            <div className={`${styles.ingredients}`}>
              {Object.entries(result).map((item, index) =>
                // eslint-disable-next-line max-len
                // eslint-disable-next-line max-len,react/no-array-index-key,no-underscore-dangle,implicit-arrow-linebreak
                <OrderInfoIngredient key={index} ingredient={allIngredients?.find((el) => el._id === item[0])} count={item[1]} />)}
            </div>
            <div className={styles.info}>
              <p className={`${styles.date} text text_type_main-default`}>
                {parseDate(order.createdAt)}
              </p>
              <div className={`${styles.priceContainer}`}>
                <p className="text text_type_digits-default">
                  {
              order.ingredients.reduce((acc:number, val) => {
                // eslint-disable-next-line max-len
                // eslint-disable-next-line no-param-reassign,no-underscore-dangle,no-unsafe-optional-chaining
                acc += allIngredients!.find((el) => el._id === val)!.price;
                return acc;
              }, 0)
            }
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
      )
      : null
  );
};

export default OrderInfo;
