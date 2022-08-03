import React from "react";
import OrderItem from "../order-item/orderItem";
import styles from './order-feed.module.css'

function OrderFeed() {
  return (
    <div className={`${styles.ordersList}`}>
      <OrderItem></OrderItem>
    </div>
  )
}

export default OrderFeed;