import React, { FC } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag } from 'react-dnd';
import { nanoid } from 'nanoid';
import { Link, useLocation } from 'react-router-dom';
import burgerIngredientStyles from './burger-ingredient.module.css';
import { TIngredient } from '../../types';
import { useSelector } from '../../hooks';

interface IBurgerIngredientProps {
  ingredient: TIngredient
}

// eslint-disable-next-line react/function-component-definition
const BurgerIngredient: FC<IBurgerIngredientProps> = ({ ingredient }) => {
  const location = useLocation();
  const ingredients = useSelector((store) => (
    // eslint-disable-next-line no-underscore-dangle
    store.ingredients.ingredientsInConstructor.filter((item) => item._id === ingredient._id)
  ));

  console.log(ingredient);

  const bun = useSelector((store) => (
    store.ingredients.bunInConstructor
  ));

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...ingredient, id: nanoid() },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div>
      {/* eslint-disable-next-line no-underscore-dangle */}
      <Link className={burgerIngredientStyles.link} to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }}>
        {/* <div ref={dragRef} onClick={() => {
    dispatch({ type: SHOW_MODAL_INGREDIENT, currentViewedIngredient: ingredient }) */}
        <div
          ref={dragRef}
          className={`${burgerIngredientStyles.ingredientCard}`}
        >
          {ingredient.type !== 'bun' && ingredients.length > 0
            && <Counter count={ingredients.length} size="default" />}
          {/* eslint-disable-next-line no-underscore-dangle */}
          {ingredient.type === 'bun' && bun && bun._id === ingredient._id
            && <Counter count={2} size="default" />}

          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src={ingredient.image} />
          <div className={`${burgerIngredientStyles.price} mt-1 mb-1`}>
            <p className="text text_type_digits-default">{ingredient.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className="text text_type_main-default">
            {ingredient.name}
          </p>
        </div>

      </Link>
    </div>
  );
};

export default BurgerIngredient;
