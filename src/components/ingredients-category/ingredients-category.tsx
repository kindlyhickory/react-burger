import React from 'react';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

import ingredientsCategoryStyles from './ingredients-category.module.css';
import { useSelector } from '../../hooks';

export interface IngredientsCategory {
  title: string;
  titleId: string;
}

// eslint-disable-next-line max-len
const IngredientsCategory = React.forwardRef<HTMLDivElement, IngredientsCategory>(({ title, titleId }, ref) => {
  // eslint-disable-next-line max-len
  const ingredients = useSelector((store) => store.ingredients.ingredients.filter((ingredient) => ingredient.type === titleId));
  return (
    <div ref={ref} className="pt-10">
      <h2 id={titleId} className={`text text_type_main-medium ${ingredientsCategoryStyles.title}`}>
        {title}
      </h2>
      <div className={`${ingredientsCategoryStyles.ingredients} pt-6 pl-4`}>
        {/* eslint-disable-next-line max-len,no-underscore-dangle */}
        {ingredients.map((ingredient) => <BurgerIngredient key={ingredient._id} ingredient={ingredient} />)}
      </div>
    </div>
  );
});

export default IngredientsCategory;
