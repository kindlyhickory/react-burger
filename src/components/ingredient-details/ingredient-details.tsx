import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { useSelector } from '../../hooks';

// eslint-disable-next-line react/function-component-definition
const IngredientDetails:FC = () => {
  const { id } = useParams<{id: string}>();

  const ingredients = useSelector((store) => store.ingredients.ingredients);

  // eslint-disable-next-line no-underscore-dangle
  const ingredient = ingredients!.find((item) => item._id === id);
  // console.log(ingredient);

  return (
    ingredient

      ? (
        <div className={`${styles.ingredient}`}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img className="mb-4" src={ingredient.image_large} />
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
      : null

  );
};

export default IngredientDetails;
