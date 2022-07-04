import React, { useEffect, useState } from 'react';
import logo from "../../images/logo.svg";
import appStyles from './App.module.css';
import AppHeader from "../app-header/app-header"
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { config } from '../../utils.js/data';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const modalOrderIsOpened = useSelector(store => store.order.modalOrderIsOpened);
  const currentViewedIngredient = useSelector(store => store.ingredients.currentViewedIngredient);

  const dispatch = useDispatch();
  const data = useSelector(store => store.ingredients.ingredients);



  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <div className={appStyles.App}>
      <AppHeader></AppHeader>
      <main className={appStyles.main}>
        {
          data.length ?
            <DndProvider backend={HTML5Backend}>
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            </DndProvider>
            :
            null}
      </main>
      {modalOrderIsOpened &&
        <Modal>
          <OrderDetails></OrderDetails>
        </Modal>
      }
      {currentViewedIngredient &&
        <Modal
          title="Детали ингредиента">
          <IngredientDetails></IngredientDetails>
        </Modal>
      }
    </div>
  );
}

export default App;
