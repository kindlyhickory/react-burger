import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseDate } from "../../utils/utils";
import styles from './order-item.module.css'
import { getIngredients } from "../../services/actions/ingredients";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

function OrdersItem({ order }) {

  const location = useLocation()


  const allIngredients = useSelector(store => store.ingredients.ingredients)

  return (
    allIngredients.length !== 0   ?
    <Link className={styles.link} to={{pathname: location.pathname === '/feed' ? `/feed/${order._id}` : `/profile/orders/${order._id}`, state: { background: location, or: order }}}>
      <div className={`${styles.item} pl-6 pr-6 pt-6 pb-6`}>
        <div className={`${styles.title}`}>
          <h2 className="text text_type_digits-default">
            {order.number}
          </h2>
          <p className={`${styles.date} text text_type_main-default`}>
            {parseDate(order.createdAt)}
          </p>
        </div>
        <h3 className="text text_type_main-medium mt-6">
          {order.name}
        </h3>
        <div className={`${styles.totalIngredientPrice} mt-6`}>
          <div className={`${styles.icons}`}>
            {order.ingredients.map((item, index) => {
              return (
                <div key={index} className={`${styles.icon}`}>
                  <img className={`${styles.icon__image}`} src={allIngredients.find((el, index) => {
                    return el._id === item
                  })?.image_mobile} alt="" />
                </div>
              )
            })}
          </div>
          <div className={`${styles.price}`}>
            <p className="text text_type_digits-default mr-2">{order.ingredients.reduce((acc, ingredientId) => {
              const newAcc = acc + allIngredients.find(el => ingredientId === el._id).price;
              return newAcc
            }, 0)}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>

    </Link>

      :
      null
  )
}

export default OrdersItem;