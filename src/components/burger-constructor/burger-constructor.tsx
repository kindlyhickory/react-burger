import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {
  useCallback, FC,
} from 'react';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';
import burgerConstructorStyles from './burger-constructor.module.css';
import { makeOrder } from '../../services/actions';
import {
  // eslint-disable-next-line max-len
  ADD_BUN_TO_CONSTRUCTOR, ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_BUN_FROM_CONSTRUCTOR, UPDATE_CONSTRUCTOR_LIST,
} from '../../services/actions/ingredients';
import BurgerItem from '../burger-item/burger-item';
import Loader from '../loader/loader.js';

import { useDispatch, useSelector } from '../../hooks';
import { TIngredient } from '../../types';

// eslint-disable-next-line react/function-component-definition
const BurgerConstructor:FC = () => {
  const dispatch = useDispatch();

  const { name, email } = useSelector((store) => store.user.user);
  const history = useHistory();
  // eslint-disable-next-line max-len
  const ingredientsInConstructor = useSelector((store) => store.ingredients.ingredientsInConstructor);
  const data = useSelector((store) => store.ingredients.ingredients);
  const bun = useSelector((store) => store.ingredients.bunInConstructor);
  const { makeOrderRequest } = useSelector((store) => store.order);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient: TIngredient) {
      if (ingredient.type !== 'bun') {
        dispatch({
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          ingredient,
        });
      } else {
        dispatch({
          type: ADD_BUN_TO_CONSTRUCTOR,
          bun: ingredient,
        });
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: UPDATE_CONSTRUCTOR_LIST,
      toIndex: hoverIndex,
      fromIndex: dragIndex,
    });
  }, [dispatch]);

  return (
    <div className={`${burgerConstructorStyles.burgerConstructor} mt-25 pl-4 pr-4`}>
      { makeOrderRequest ? <Loader text="Заказ оформляется..." />
        : (
          <div ref={dropTarget} className={`${isHover ? burgerConstructorStyles.listHover : ''} ${burgerConstructorStyles.ingredientsContainer}`}>
            {bun
            && (
            <div className="pl-8">
              <ConstructorElement
                type="top"
                handleClose={() => {
                  dispatch({
                    type: REMOVE_BUN_FROM_CONSTRUCTOR,
                  });
                }}
                isLocked
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
            )}
            {data.length !== 0
            && (
            <div className={`${burgerConstructorStyles.list}`}>
              {
                ingredientsInConstructor.map((element, index) => (
                  <BurgerItem
                    key={element.id}
                    item={element}
                    index={index}
                    moveItem={moveItem}
                  />
                ))
              }
            </div>
            )}
            {bun
            && (
            <div className="pl-8 mb-10">
              <ConstructorElement
                type="bottom"
                isLocked
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
                handleClose={() => {
                  dispatch({
                    type: REMOVE_BUN_FROM_CONSTRUCTOR,
                  });
                }}
              />
            </div>
            )}
          </div>
        )}

      <div className={burgerConstructorStyles.order}>
        <div className={burgerConstructorStyles.price}>
          <p className="text text_type_digits-medium">
            {
            ingredientsInConstructor.reduce((acc, ingredient) => {
              const newAcc = acc + ingredient.price;
              return newAcc;
            }, bun ? bun.price * 2 : 0)
          }
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          disabled={!bun}
          type="primary"
          size="large"
          onClick={() => {
            if (email === '' && name === '') {
              history.replace({ pathname: '/login' });
            } else {
              const ingredientsId = ingredientsInConstructor.map((ingredient) =>
              // console.log(ingredient._id);
                // eslint-disable-next-line implicit-arrow-linebreak,no-underscore-dangle
                ingredient._id);
              // eslint-disable-next-line no-underscore-dangle
              ingredientsId.push(bun!._id);
              // eslint-disable-next-line no-underscore-dangle
              ingredientsId.push(bun!._id);
              dispatch(makeOrder(ingredientsId));
            }
          }}
        >
          {bun ? 'Нажми на меня' : 'Добавьте булку для заказа'}
        </Button>
      </div>
    </div>

  );
};

export default BurgerConstructor;
