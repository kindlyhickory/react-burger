import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header"
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, HIDE_MODAL_INGREDIENT } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HIDE_ORDER_MODAL } from '../../services/actions';

function App() {
  const modalOrderIsOpened = useSelector(store => store.order.modalOrderIsOpened);
  const currentViewedIngredient = useSelector(store => store.ingredients.currentViewedIngredient);

  const dispatch = useDispatch();
  const data = useSelector(store => store.ingredients.ingredients);



  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <div className={appStyles.app}>
      <AppHeader />
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
      {currentViewedIngredient &&
        <Modal
          title="Детали ингредиента"
          onClose={() => {
            dispatch({
              type: HIDE_MODAL_INGREDIENT,
            })
          }}>
          <IngredientDetails></IngredientDetails>
        </Modal>
      }
    </div>
  );
}

export default App;
