import React, { useEffect } from "react";
import styles from "../components/ingredient-details/ingredient-details.module.css";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/ingredients";
import { getUser } from "../services/actions/user";

function IngredientPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const {ingredients, ingredientsRequest} = useSelector(store => store.ingredients);
  const { name, email } = useSelector(store => store.user.user);
  // console.log(ingredients, ingredientsRequest);

  const ingredient = ingredients.find(item => item._id === id);
  // console.log(ingredient);

  return (
    ingredient ?
    <div className={`${styles.ingredient} mt-30`}>
      <h2 className='text text_type_main-large'>Детали ингредиента</h2>
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

export default IngredientPage;