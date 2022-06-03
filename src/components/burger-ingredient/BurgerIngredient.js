import React, { useState } from "react";
import burgerIngredientStyles from "./BurgerIngredient.module.css"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({ ingredient }) => {
  const [count, setCount] = useState(1);
  return (
    <div className={`${burgerIngredientStyles.ingredientCard}`}>
      {count > 0 &&
        <Counter count={count} size="default" />
      }
      <img src={ingredient.image} />
      <div className={`${burgerIngredientStyles.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">
        {ingredient.name}
      </p>
    </div>

  )
}

export default BurgerIngredient