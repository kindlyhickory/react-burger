import React, { useEffect } from "react";
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { ingredientType } from "../../utils/types";
import { useParams } from "react-router-dom";

const IngredientDetails = () => {
  const { id } = useParams();

  const ingredients = useSelector(store => store.ingredients.ingredients);


  const ingredient = ingredients.find(item => item._id === id);
  // console.log(ingredient);

  return (
    ingredient ?

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
      :
      null

  )
}

export default IngredientDetails;