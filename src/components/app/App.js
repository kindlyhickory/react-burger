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

function App() {
  const [data, setData] = useState({ data: [] })
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailOpened, setIsIngredientDetailOpened] = useState({ ingredient: '', isOpened: false });

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailOpened({ ingredient: '', isOpened: false })
  }

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  }


  useEffect(() => {
    fetch(config.baseUrl)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка запроса: ${res.status}. Запрос: ${res.url}`)
      })
      .then((res) => setData({ data: res.data }))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className={appStyles.App}>
      <AppHeader />
      <main className={appStyles.main}>
        {data.data.length ?
          <>
            <BurgerIngredients
              setIsIngredientDetailOpened={setIsIngredientDetailOpened}
              data={data.data} />
            <BurgerConstructor
              setIsOrderDetailsOpened={setIsOrderDetailsOpened}
              data={data.data} />
          </>
          :
          null}
      </main>
      {isOrderDetailsOpened &&
        <Modal
          closeAllModals={closeAllModals}>
          <OrderDetails></OrderDetails>
        </Modal>
      }
      {isIngredientDetailOpened.isOpened &&
        <Modal
          closeAllModals={closeAllModals}
          title="Детали ингредиента">
          <IngredientDetails isIngredientDetailOpened={isIngredientDetailOpened}></IngredientDetails>
        </Modal>
      }
    </div>
  );
}

export default App;
