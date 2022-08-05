import React, { useEffect } from "react";
import styles from './order-feed-page.module.css';
import OrderFeed from "../components/order-feed/order-feed";
import OrderWork from "../components/order-work/order-work";
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../services/actions/webSocket";
import { getIngredients } from "../services/actions/ingredients";

function OrderFeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all'})
    return () => {
      dispatch({type: WS_CONNECTION_CLOSE});
    }
  }, [dispatch]);
  const { orders } = useSelector(store => store.ws);

  return (
    orders.length !== 0 ?
    <main className={`${styles.main} pt-10`}>
      <OrderFeed type={'feed'}></OrderFeed>
      <OrderWork></OrderWork>
    </main>
      :
      <p>loading</p>
  )
}

export default OrderFeedPage;