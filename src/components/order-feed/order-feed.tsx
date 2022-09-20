import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import OrderItem from '../order-item/orderItem';
import styles from './order-feed.module.css';
import { getIngredients } from '../../services/actions/ingredients';
// eslint-disable-next-line import/extensions
import { getCookie } from '../../utils/utils';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/actions/webSocket';
// eslint-disable-next-line import/extensions
import { config } from '../../utils/data';
import Loader from '../loader/loader';
import { useDispatch, useSelector } from '../../hooks';

// eslint-disable-next-line react/function-component-definition
const OrderFeed:FC<{ type:string }> = ({ type }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'profile') {
      const token = getCookie('accessToken');
      if (!token) return;
      dispatch({ type: WS_CONNECTION_START, payload: `${config.wsSocketUrl}?token=${token}` });
    }
    // eslint-disable-next-line consistent-return
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  const { orders } = useSelector((store) => store.ws);

  const location = useLocation();

  // console.log( orders );
  // useEffect(() => {
  //   dispatch(getIngredients());
  // }, [dispatch]);
  return (
    orders.length !== 0
      ? (
        <div className={`${location.pathname === '/profile/orders' && 'pt-10'}`}>
          {
        location.pathname === '/feed'
        && (
        <h2 className="text text_type_main-large mb-5">
          Лента заказов
        </h2>
        )
      }
          <div className={`${location.pathname === '/feed' ? styles.ordersList : styles.ordersListProfile} pr-2`}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {orders.map((order, index) => <OrderItem key={index} order={order} />)}
          </div>
        </div>
      )
      : (
        <div className="ml-30 mt-30">
          <Loader text="Загрузка заказов..." />
        </div>
      )
  );
};

export default OrderFeed;
