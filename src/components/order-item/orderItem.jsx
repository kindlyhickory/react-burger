import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseDate } from "../../utils/utils";
import styles from './order-item.module.css'
import { getIngredients } from "../../services/actions/ingredients";

function OrdersItem() {

  const order = {
    "ingredients": [
      "60d3b41abdacab0026a733c7",
      "60d3b41abdacab0026a733d2",
      "60d3b41abdacab0026a733d3",
      "60d3b41abdacab0026a733d4"
    ],
    "_id": "",
    "status": "done",
    "number": 0,
    "createdAt": "2021-06-23T14:43:22.587Z",
    "updatedAt": "2021-06-23T14:43:22.603Z"
  }
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getIngredients());
  }, [dispatch]);

  const ingredients = useSelector(store => store.ingredients.ingredients)
  console.log(ingredients);

  return (
    ingredients.length !== 0   ?
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
        Название заказа
      </h3>
      <div className={`${styles.icons} mt-6`}>
        {order.ingredients.map((item, index) => {
          return (
            <div className={`${styles.icon}`}>
              <img className={`${styles.icon__image}`} src={ingredients.find((el, index) => {
                return el._id === item
              }).image_mobile} alt="" />
            </div>
          )
        })}
        <p>price</p>
      </div>
    </div>
      :
      null
  )
}

export default OrdersItem;