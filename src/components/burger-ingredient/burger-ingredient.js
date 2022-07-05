import React, { useState } from "react";
import burgerIngredientStyles from "./burger-ingredient.module.css"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { SHOW_MODAL_INGREDIENT } from "../../services/actions/ingredients";
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { nanoid } from "nanoid";

const BurgerIngredient = ({ ingredient }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => (
    store.ingredients.ingredientsInConstructor.filter(item => item._id === ingredient._id)
  ))

  const bun = useSelector(store => (
    store.ingredients.bunInConstructor
  ))

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...ingredient, id: nanoid() },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })
=======
import { ingredientType } from "../../utils.js/types";
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5

  return (
    !isDrag &&
    <div ref={dragRef} onClick={() => {
      dispatch({ type: SHOW_MODAL_INGREDIENT, currentViewedIngredient: ingredient })

    }} className={`${burgerIngredientStyles.ingredientCard}`}>
      {ingredient.type !== 'bun' && ingredients.length > 0 &&
        <Counter count={ingredients.length} size="default" />
      }
      {ingredient.type === 'bun' && bun && bun._id === ingredient._id &&
        < Counter count={2} size="default" />
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
<<<<<<< HEAD
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
=======
  onClick: PropTypes.func.isRequired,
  ingredient: ingredientType.isRequired,
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
}

export default BurgerIngredient