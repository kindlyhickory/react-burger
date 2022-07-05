import React from "react";
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { ingredientType } from "../../utils.js/types";

const IngredientDetails = () => {

  const ingredient = useSelector(store => store.ingredients.currentViewedIngredient);
  const dispatch = useDispatch();

  return (
    <div className={`${styles.ingredient}`}>
      <img className='mb-4' src={ingredient.image_large}></img>
      <p className="text text_type_main-medium mb-8">
        {ingredient.name}
      </p>
      <div className={`${styles.calories}`}>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>

      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  isIngredientDetailOpened: PropTypes.shape({
    ingredient: ingredientType.isRequired,
    isOpened: PropTypes.bool,
  }),
}

export default IngredientDetails;