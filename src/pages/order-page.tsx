import React, { FC, useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import styles from './order-page.module.css';
import OrderInfoIngredient from '../components/order-info-ingredient/order-info-ingredient';
import { getCookie, parseDate } from '../utils/utils';
import { getIngredients } from '../services/actions/ingredients';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../services/actions/webSocket';
import { config } from '../utils/data';
import { useDispatch, useSelector } from '../hooks';
import { TIngredient } from '../types';

type TOrderPage = {
  type: string
}

// eslint-disable-next-line react/function-component-definition
const OrderPage:FC<TOrderPage> = ({ type }) => {
  const { id } = useParams<{id: string}>();

  const dispatch = useDispatch();

  const { orders } = useSelector((store) => store.ws);

  useEffect(() => {
    dispatch(getIngredients());
    if (type === 'profile') {
      const token = getCookie('accessToken');
      if (!token) return;
      dispatch({ type: WS_CONNECTION_START, payload: `${config.wsSocketUrl}?token=${token}` });
    } else if (type === 'feed') {
      dispatch({ type: WS_CONNECTION_START, payload: `${config.wsSocketUrl}/all` });
    }
    // eslint-disable-next-line consistent-return
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  // eslint-disable-next-line no-underscore-dangle
  const order = orders.find((el) => el._id === id);
  const allIngredients = useSelector((store) => store.ingredients.ingredients);
  // console.log(order);
  // console.log(id);
  const resultOrder = { ...order };

  interface IObjectItem {
    [index: string]: number,
  }
  const result = resultOrder?.ingredients?.reduce((acc: IObjectItem, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  return (
    order && allIngredients!.length !== 0
      ? (
        <div className={styles.infoContainer}>
          <p className={`${styles.orderId} text text_type_digits-default`}>
            #
            {order.number}
          </p>
          <p className={`${styles.title} text text_type_main-medium mb-2 mt-5`}>
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
              {/* eslint-disable-next-line max-len,react/no-array-index-key,no-underscore-dangle */}
              {Object.entries(result).map((item, index) => <OrderInfoIngredient key={index} ingredient={allIngredients!.find((el: TIngredient) => el._id === item[0])} count={item[1]} />)}
            </div>
            <div className={styles.info}>
              <p className={`${styles.date} text text_type_main-default`}>
                {parseDate(order.createdAt)}
              </p>
              <div className={`${styles.priceContainer}`}>
                <p className="text text_type_digits-default">
                  {
                order.ingredients.reduce((acc, val) => {
                  // eslint-disable-next-line no-param-reassign,no-underscore-dangle
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
      : <p>loading</p>
  );
};

export default OrderPage;
