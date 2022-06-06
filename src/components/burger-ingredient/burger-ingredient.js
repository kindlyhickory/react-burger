import React, { useState } from "react";
import burgerIngredientStyles from "./burger-ingredient.module.css"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'

const BurgerIngredient = ({ onClick, ingredient }) => {
  const [count, setCount] = useState(1);
  return (
    <div onClick={() => onClick({ ingredient: ingredient, isOpened: true })} className={`${burgerIngredientStyles.ingredientCard}`}>
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
BurgerIngredient.propTypes = {
  onClick: PropTypes.func.isRequired,
  ingredient: PropTypes.shape(
    {
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,

    }
  ).isRequired,
}

export default BurgerIngredient