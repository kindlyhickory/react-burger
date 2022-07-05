import React, { useEffect, useState } from 'react';
import logo from "../../images/logo.svg";
import appStyles from './app.module.css';
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
    <div className={appStyles.app}>
      <AppHeader />
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
<<<<<<< HEAD:src/components/app/App.js
      {modalOrderIsOpened &&
        <Modal>
=======
      {isOrderDetailsOpened &&
        <Modal
          closeAllModals={closeAllModals}>
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5:src/components/app/app.js
          <OrderDetails></OrderDetails>
        </Modal>
      }
      {currentViewedIngredient &&
        <Modal
<<<<<<< HEAD:src/components/app/App.js
=======
          closeAllModals={closeAllModals}
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5:src/components/app/app.js
          title="Детали ингредиента">
          <IngredientDetails></IngredientDetails>
        </Modal>
      }
    </div>
  );
}

export default App;
