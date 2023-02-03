import React, { FC, useEffect } from 'react';
import styles from './order-feed-page.module.css';
import OrderFeed from '../components/order-feed/order-feed';
import OrderWork from '../components/order-work/order-work';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../services/actions/webSocket';
import { config } from '../utils/data';
import Loader from '../components/loader/loader';
import { useDispatch, useSelector } from '../hooks';

// eslint-disable-next-line react/function-component-definition
const OrderFeedPage:FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `${config.wsSocketUrl}/all` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);
  const { orders } = useSelector((store) => store.ws);

  return (
    orders.length !== 0
      ? (
        <main className={`${styles.main} pt-10`}>
          <OrderFeed type="feed" />
          <OrderWork />
        </main>
      )
      : (
        <div className="mt-30">
          <Loader text="Загрузка ленты заказов" />
        </div>
      )

  );
};

export default OrderFeedPage;
