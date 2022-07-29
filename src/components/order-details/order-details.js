import React from "react";
import { useSelector } from "react-redux";
import doneImagePath from "../../images/done.svg"
import styles from "./order-details.module.css"

const OrderDetails = () => {
  const currentOrder = useSelector(store => store.order.currentOrder)
  return (
    <div className={`${styles.order} pl-15 pr-15 mt-9 pb-15`}>
      <h3 className="text text_type_digits-large mb-8">{currentOrder.order.number}</h3>
      <p className="text text_type_main-medium mb-15">
        идентификатор заказа
      </p>
      <img src={doneImagePath} className="mb-15"></img>
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails;