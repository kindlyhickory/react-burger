import React, { useState } from "react";
import burgerIngredientStyles from "./burger-ingredient.module.css"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { SHOW_MODAL_INGREDIENT } from "../../services/actions/ingredients";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { nanoid } from "nanoid";
import { ingredientType } from "../../utils/types";
import { Link, useLocation } from "react-router-dom";

const BurgerIngredient = ({ ingredient }) => {
  const location = useLocation();
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

  return (
    !isDrag &&
    <Link className={burgerIngredientStyles.link} to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }}>
      {/* <div ref={dragRef} onClick={() => {
    dispatch({ type: SHOW_MODAL_INGREDIENT, currentViewedIngredient: ingredient }) */}
      < div ref={dragRef} className={`${burgerIngredientStyles.ingredientCard}`
      }>
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

      </ div>

    </Link>
  )
}
BurgerIngredient.propTypes = {
  ingredient: ingredientType.isRequired,
}

export default BurgerIngredient