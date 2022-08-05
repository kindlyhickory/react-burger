import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useCallback } from "react";
import Sortable from 'sortablejs';
import PropTypes from 'prop-types';
import { update } from "immutability-helper";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { makeOrder, SHOW_ORDER_MODAL } from "../../services/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { ADD_BUN_TO_CONSTRUCTOR, ADD_INGREDIENT_TO_CONSTRUCTOR, CLEAR_CONSTRUCTOR_LIST, REMOVE_BUN_FROM_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, UPDATE_CONSTRUCTOR_LIST } from "../../services/actions/ingredients";
import BurgerItem from "../burger-item/burger-item";
import { userInformationReducer } from "../../services/reducers/user";
import { Redirect, Route, useHistory } from 'react-router-dom';
import { getUser } from "../../services/actions/user";


const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { name, email } = useSelector(store => store.user.user);
  const history = useHistory();

  const ingredientsInConstructor = useSelector(store => store.ingredients.ingredientsInConstructor);
  const data = useSelector(store => store.ingredients.ingredients);
  const bun = useSelector(store => store.ingredients.bunInConstructor);
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      if (ingredient.type !== 'bun') {
        dispatch({
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          ingredient: ingredient,
        })
      } else {
        dispatch({
          type: ADD_BUN_TO_CONSTRUCTOR,
          bun: ingredient,
        })
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  })

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: UPDATE_CONSTRUCTOR_LIST,
      toIndex: hoverIndex,
      fromIndex: dragIndex,
    });
  }, [dispatch])


  return (
    <div className={`${burgerConstructorStyles.burgerConstructor} mt-25 pl-4 pr-4`}>
      <div ref={dropTarget} className={`${isHover ? burgerConstructorStyles.listHover : ''} ${burgerConstructorStyles.ingredientsContainer}`}>
        {bun &&
          <div className="pl-8">
            <ConstructorElement
              type="top"
              handleClose={() => {
                dispatch({
                  type: REMOVE_BUN_FROM_CONSTRUCTOR,
                })
              }}
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        }
        {data.length !== 0 &&
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
        }
        {bun &&
          <div className="pl-8 mb-10">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              handleClose={() => {
                dispatch({
                  type: REMOVE_BUN_FROM_CONSTRUCTOR,
                })
              }}
            />
          </div>
        }
      </div>
      <div className={burgerConstructorStyles.order}>
        <div className={burgerConstructorStyles.price}>
          <p className="text text_type_digits-medium">{
            ingredientsInConstructor.reduce((acc, ingredient) => {
              const newAcc = acc + ingredient.price;
              return newAcc;
            }, bun ? bun.price * 2 : 0)
          }</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button disabled={bun ? false : true} type="primary" size="large" onClick={() => {
          if (email === "" && name === "") {
            history.replace({ pathname: '/login' });
          } else {
            const ingredientsId = ingredientsInConstructor.map(ingredient => {
              // console.log(ingredient._id);
              return ingredient._id
            })
            ingredientsId.push(bun._id);
            ingredientsId.push(bun._id);
            // console.log(ingredientsId);
            dispatch(makeOrder(ingredientsId))
          }
        }}>
          {bun ? 'Нажми на меня' : "Добавьте булку для заказа"}
        </Button>
      </div>
    </div>


  )

}

export default BurgerConstructor;