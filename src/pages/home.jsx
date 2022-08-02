import React, { useEffect, useState } from 'react';
import appStyles from '../components/app/app.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-details/order-details';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, HIDE_MODAL_INGREDIENT } from '../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HIDE_ORDER_MODAL } from '../services/actions';

function HomePage() {
  const modalOrderIsOpened = useSelector(store => store.order.modalOrderIsOpened);
  const currentViewedIngredient = useSelector(store => store.ingredients.currentViewedIngredient);

  const dispatch = useDispatch();
  const data = useSelector(store => store.ingredients.ingredients);



  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      <main className={appStyles.main}>
        {
          data.length ?
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
            :
            null}
      </main>
      {modalOrderIsOpened &&
        <Modal
          onClose={() => {
            dispatch({
              type: HIDE_ORDER_MODAL,
            })
          }}>
          <OrderDetails></OrderDetails>
        </Modal>
      }
      {/* {currentViewedIngredient &&
        <Modal
          title="Детали ингредиента"
          onClose={() => {
            dispatch({
              type: HIDE_MODAL_INGREDIENT,
            })
          }}>
          <IngredientDetails></IngredientDetails>
        </Modal>
      } */}
    </>
  );
}

export default HomePage;
