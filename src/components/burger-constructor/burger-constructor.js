<<<<<<< HEAD
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useCallback } from "react";
import Sortable from 'sortablejs';
=======
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
import PropTypes from 'prop-types';
import { update } from "immutability-helper";
import burgerConstructorStyles from "./burger-constructor.module.css";
<<<<<<< HEAD
import { makeOrder, SHOW_ORDER_MODAL } from "../../services/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { ADD_BUN_TO_CONSTRUCTOR, ADD_INGREDIENT_TO_CONSTRUCTOR, CLEAR_CONSTRUCTOR_LIST, REMOVE_BUN_FROM_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, UPDATE_CONSTRUCTOR_LIST } from "../../services/actions/ingredients";
import BurgerItem from "../burger-item/burger-item";


const BurgerConstructor = () => {
  const dispatch = useDispatch();

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
=======
import { ingredientType } from "../../utils.js/types";
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5


  return (
    <div className={`${burgerConstructorStyles.burgerConstructor} mt-25 pl-4 pr-4`}>
<<<<<<< HEAD
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
              isLocked={false}
              text={bun.name}
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
                  key={index}
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
              isLocked={false}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
              handleClose={() => {
                dispatch({
                  type: REMOVE_BUN_FROM_CONSTRUCTOR,
                })
              }}
            />
          </div>
=======
      <div className="pl-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={data.find(el => {
            return el._id === "60d3b41abdacab0026a733c6"
          }).image}
        />
      </div>
      <div className={`${burgerConstructorStyles.list}`}>
        {
          data.map((element, index) => (
            element.type !== 'bun'
            &&
            <div key={index} className={`${burgerConstructorStyles.element}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
              />
            </div>
          ))
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
        }
      </div>
      <div className={burgerConstructorStyles.order}>
        <div className={burgerConstructorStyles.price}>
          <p className="text text_type_digits-medium">{
<<<<<<< HEAD
            ingredientsInConstructor.reduce((acc, ingredient) => {
              const newAcc = acc + ingredient.price;
=======
            data.reduce((acc, ingredient) => {
              const newAcc = acc + (ingredient.type !== 'bun' ? ingredient.price : 0);
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
              return newAcc;
            }, bun ? bun.price * 2 : 0)
          }</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button disabled={bun ? false : true} type="primary" size="large" onClick={() => {
          dispatch(makeOrder(ingredientsInConstructor.map(ingredient => ingredient._id)))
        }}>
          {bun ? 'Нажми на меня' : "Добавьте булку для заказа"}
        </Button>
      </div>
    </div>


  )

}
<<<<<<< HEAD
// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape(
//     {
//       _id: PropTypes.string,
//       name: PropTypes.string,
//       type: PropTypes.string,
//       proteins: PropTypes.number,
//       fat: PropTypes.number,
//       carbohydrates: PropTypes.number,
//       calories: PropTypes.number,
//       price: PropTypes.number,
//       image: PropTypes.string,
//       image_mobile: PropTypes.string,
//       image_large: PropTypes.string,

//     }
//   )).isRequired,
// }
=======
BurgerConstructor.propTypes = {
  setIsOrderDetailsOpened: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(ingredientType).isRequired,
}
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5

export default BurgerConstructor;