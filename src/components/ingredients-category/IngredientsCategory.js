import React from "react";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";

import ingredientsCategoryStyles from "./IngredientsCategory.module.css"

const IngredientsCategory = ({ title, titleId, ingredients }) => {
  return (
    <div className={`pt-10`}>
      <h2 id={titleId} className={`text text_type_main-medium ${ingredientsCategoryStyles.title}`}>
        {title}
      </h2>
      <div className={`${ingredientsCategoryStyles.ingredients} pt-6 pl-4`}>
        {ingredients.map(ingredient => <BurgerIngredient key={ingredient._id} ingredient={ingredient} />)}
      </div>
    </div>

  )
}

export default IngredientsCategory;