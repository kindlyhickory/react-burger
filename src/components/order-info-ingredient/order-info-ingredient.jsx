import React from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-info-ingredient.module.css';
import { useSelector } from "react-redux";

function OrderInfoIngredient({ingredient, count}) {
  // console.log(ingredient);
  // console.log(count);
  return (
    <div className={styles.order}>
      <div className={`${styles.icon}`}>
        <img className={`${styles.icon__image}`} src={ingredient.image_mobile} alt="" />
      </div>
      <p className={`text text_type_main-default`}>
        {ingredient.name}
      </p>
      <div className={`${styles.priceContainer}`}>
        <p className="text text_type_digits-default">{count} x {ingredient.price}</p>
        <CurrencyIcon type="primary"></CurrencyIcon>
      </div>
    </div>
  )
}

export default OrderInfoIngredient;