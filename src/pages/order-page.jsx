import React, { useEffect } from "react";
import styles from "./order-page.module.css"
import OrderInfoIngredient from "../components/order-info-ingredient/order-info-ingredient";
import { getCookie, parseDate } from "../utils/utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/ingredients";
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from "../services/actions/webSocket";
import { config } from "../utils/data";

function OrderPage({type}) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { orders } = useSelector(store => store.ws);

  useEffect(() => {
    dispatch(getIngredients());
    if (type === 'profile') {
      const token = getCookie('accessToken');
      if (!token) return
      dispatch({type: WS_CONNECTION_START, payload: `${config.wsSocketUrl}?token=${token}`});
    }
    else if (type === 'feed') {
      dispatch({type: WS_CONNECTION_START, payload: `${config.wsSocketUrl}/all` })
    }
    return () => {
      dispatch({type: WS_CONNECTION_CLOSE});
    }
  }, [dispatch]);

  const order = orders.find(el => el._id === id);
  const allIngredients = useSelector(store => store.ingredients.ingredients)
  // console.log(order);
  // console.log(id);
  const resultOrder = {...order};
  const result = resultOrder?.ingredients?.reduce((acc, el, index) => {
    acc[el] = (acc[el] || 0 ) + 1;
    return acc;
  }, {});

  console.log()

  return (
    order && allIngredients.length !== 0 ?
      <div className={styles.infoContainer}>
        <p className={`${styles.orderId} text text_type_digits-default`}>#{order.number}</p>
        <p className={`${styles.title} text text_type_main-medium mb-2 mt-5`}>
          {order.name}
        </p>
        <p className={`${styles.status} text text_type_main-default mb-15`}>
          {order.status === 'done' ? 'Выполнено'
            : order.status === 'pending' ? 'Готовится'
              : null}
        </p>
        <div>
          <p className="text text_type_main-medium mb-6">
            Состав
          </p>
          <div className={`${styles.ingredients}`}>
            {Object.entries(result).map((item, index) => {
              return <OrderInfoIngredient key={index} ingredient={allIngredients.find(el=> el._id === item[0])} count={item[1]}></OrderInfoIngredient>
            })}
          </div>
          <div className={styles.info}>
            <p className={`${styles.date} text text_type_main-default`}>
              {parseDate(order.createdAt)}
            </p>
            <div className={`${styles.priceContainer}`}>
              <p className="text text_type_digits-default">{
                order.ingredients.reduce((acc, val, ) => {
                  acc += allIngredients.find(el => el._id === val).price;
                  return acc;
                }, 0)
              }</p>
              <CurrencyIcon type="primary"></CurrencyIcon>
            </div>
          </div>
        </div>
      </div>
      : <p>loading</p>
  )
}

export default OrderPage;