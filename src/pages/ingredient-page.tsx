import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../components/ingredient-details/ingredient-details.module.css';
import { useDispatch, useSelector } from '../hooks';

// eslint-disable-next-line react/function-component-definition
const IngredientPage:FC = () => {
  const { id } = useParams<{id: string}>();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getIngredients());
  // }, [dispatch]);

  const { ingredients } = useSelector((store) => store.ingredients);
  // console.log(ingredients, ingredientsRequest);

  // eslint-disable-next-line no-underscore-dangle
  const ingredient = ingredients!.find((item) => item._id === id);
  // console.log(ingredient);

  return (
    ingredient
      ? (
        <div className={`${styles.ingredient} mt-30`}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
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

export default IngredientPage;
