import React, { useEffect } from "react";
import OrderItem from "../order-item/orderItem";
import styles from './order-feed.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "../../services/actions/webSocket";
import { MAX_INGREDIENTS } from "../../utils/constants";

function OrderFeed({type}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'profile') {
      const token = getCookie('accessToken');
      if (!token) return
      dispatch({type: WS_CONNECTION_START, payload: `wss://norma.nomoreparties.space/orders?token=${token}`});
    }
    return () => {
      dispatch({type: WS_CONNECTION_CLOSE});
    }
  }, [dispatch])


  const { orders } = useSelector(store => store.ws);

  const location = useLocation();

  // console.log( orders );
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  return (
    orders.length !== 0 ?
    <div className={`${location.pathname === '/profile/orders' && 'pt-10'}`}>
      {
        location.pathname === '/feed' &&
        <h2 className="text text_type_main-large mb-5">
          Лента заказов
        </h2>
      }
      <div className={`${location.pathname === '/feed' ? styles.ordersList : styles.ordersListProfile} pr-2`}>
        {orders.map((order, index) => {
          return <OrderItem key={index} order={order}></OrderItem>
        })}
      </div>
    </div>
    :
      <p>loading</p>
    )

}

export default OrderFeed;