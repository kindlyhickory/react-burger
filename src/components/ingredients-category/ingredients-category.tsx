import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from 'prop-types';

import ingredientsCategoryStyles from "./ingredients-category.module.css"
import { useSelector } from "../../hooks";
// import { useSelector } from "react-redux";

export interface IngredientsCategory {
  title: string;
  titleId: string;
}


const IngredientsCategory = React.forwardRef<HTMLDivElement, IngredientsCategory>(({ title, titleId }, ref) => {
  const ingredients = useSelector(store => store.ingredients.ingredients.filter(ingredient => ingredient.type === titleId));
  return (
    <div ref={ref} className={`pt-10`}>
      <h2 id={titleId} className={`text text_type_main-medium ${ingredientsCategoryStyles.title}`}>
        {title}
      </h2>
      <div className={`${ingredientsCategoryStyles.ingredients} pt-6 pl-4`}>
        {ingredients.map(ingredient => <BurgerIngredient key={ingredient._id} ingredient={ingredient} />)}
      </div>
    </div>
  )
})


export default IngredientsCategory;