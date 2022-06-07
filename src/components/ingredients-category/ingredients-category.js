import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from 'prop-types';

import ingredientsCategoryStyles from "./ingredients-category.module.css"
import { ingredientType } from "../../utils.js/types";

const IngredientsCategory = ({ setIsIngredientDetailOpened, title, titleId, ingredients, titleRef }) => {
  return (
    <div className={`pt-10`}>
      <h2 ref={titleRef} id={titleId} className={`text text_type_main-medium ${ingredientsCategoryStyles.title}`}>
        {title}
      </h2>
      <div className={`${ingredientsCategoryStyles.ingredients} pt-6 pl-4`}>
        {ingredients.map(ingredient => <BurgerIngredient onClick={setIsIngredientDetailOpened} key={ingredient._id} ingredient={ingredient} />)}
      </div>
    </div>
  )
}

IngredientsCategory.propTypes = {
  setIsIngredientDetailOpened: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  titleRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired
}


export default IngredientsCategory;