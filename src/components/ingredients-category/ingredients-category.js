import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from 'prop-types';

import ingredientsCategoryStyles from "./ingredients-category.module.css"
<<<<<<< HEAD
import { useSelector } from "react-redux";

import { useDrag } from "react-dnd";

const IngredientsCategory = React.forwardRef(({ title, titleId }, ref) => {
  const ingredients = useSelector(store => store.ingredients.ingredients.filter(ingredient => ingredient.type === titleId));
  return (
    <div ref={ref} className={`pt-10`}>
      <h2 id={titleId} className={`text text_type_main-medium ${ingredientsCategoryStyles.title}`}>
=======
import { ingredientType } from "../../utils.js/types";

const IngredientsCategory = ({ setIsIngredientDetailOpened, title, titleId, ingredients, titleRef }) => {
  return (
    <div className={`pt-10`}>
      <h2 ref={titleRef} id={titleId} className={`text text_type_main-medium ${ingredientsCategoryStyles.title}`}>
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
        {title}
      </h2>
      <div className={`${ingredientsCategoryStyles.ingredients} pt-6 pl-4`}>
        {ingredients.map(ingredient => <BurgerIngredient key={ingredient._id} ingredient={ingredient} />)}
      </div>
    </div>
  )
})

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
<<<<<<< HEAD
=======
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  titleRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
}


export default IngredientsCategory;