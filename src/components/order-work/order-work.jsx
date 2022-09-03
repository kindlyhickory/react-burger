import React from "react";
import styles from './order-work.module.css'
import { useSelector } from "react-redux";

function OrderWork() {

  const { orders, total, totalToday } = useSelector(store => store.ws)
  // console.log(orders);
  return (
    <div className={`${styles.orderWork}`}>
      <div className={`${styles.orders} mb-15`}>
        <div className={`${styles.ready}`}>
          <p className="text text_type_main-medium mb-6">
            Готовы
          </p>
          <ul className={`${styles.ready__orders}`}>
            {orders.map((el, index) => el.status === 'done' && <li className={`text text_type_digits-default mb-2 ${styles.list__item}`} key={index}>{el.number}</li>)}
          </ul>
        </div>
        <div className={`${styles.inProgress}`}>
          <p className="text text_type_main-medium mb-6">
            В работе
          </p>
          <ul className={`${styles.inProgress__orders}`}>
            {orders.map((el, index) => el.status === 'pending' && <li className={`text text_type_digits-default ${styles.list__item}`} key={index}>{el.number}</li>)}
          </ul>
        </div>

      </div>
      <p className="text text_type_main-medium">
        Выполнено за всё время:
      </p>
      <p className={`${styles.total} text text_type_digits-large mb-15`}>{total}</p>
      <p className="text text_type_main-medium">
        Выполнено за сегодня:
      </p>
      <p className={`${styles.total} text text_type_digits-large mb-15`}>{totalToday}</p>
    </div>
  )
}

export default OrderWork;