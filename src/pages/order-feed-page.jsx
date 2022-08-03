import React, { useEffect } from "react";
import styles from './order-feed-page.module.css';
import OrderFeed from "../components/order-feed/order-feed";
import OrderWork from "../components/order-work/order-work";
import { useDispatch } from "react-redux";
import { WS_CONNECTION_START } from "../services/actions/webSocket";

function OrderFeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all'})
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <OrderFeed></OrderFeed>
      <OrderWork></OrderWork>
    </main>
  )
}

export default OrderFeedPage;