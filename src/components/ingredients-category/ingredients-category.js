import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from 'prop-types';

import ingredientsCategoryStyles from "./ingredients-category.module.css"

const IngredientsCategory = ({ setIsIngredientDetailOpened, title, titleId, ingredients }) => {
  return (
    <div className={`pt-10`}>
      <h2 id={titleId} className={`text text_type_main-medium ${ingredientsCategoryStyles.title}`}>
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
  ingredients: PropTypes.arrayOf(PropTypes.shape(
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
  )).isRequired,
}


export default IngredientsCategory;