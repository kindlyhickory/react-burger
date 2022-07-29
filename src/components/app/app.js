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

import ProtectedRoute from '../protected-route';

import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegistrationPage from '../../pages/registration';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import { getUser, updateToken } from '../../services/actions/user';
import { getCookie } from '../../utils/utils';

function App() {
  const dispatch = useDispatch();

  const location = useLocation();
  const background = location.state?.background;

  const { password } = useSelector(store => store.user.user)

  useEffect(() => {
    if (getCookie('refreshToken') && !getCookie('accessToken')) {
      dispatch(updateToken(getCookie('refreshToken')))
    }
    dispatch(getUser(password))
  }, []);


  return (
    <div className={appStyles.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <ProtectedRoute path='/login' exact={true}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute path='/register' exact={true} >
          <RegistrationPage />
        </ProtectedRoute>
        <ProtectedRoute path='/forgot-password' exact={true}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path='/reset-password' exact={true}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path='/profile' exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path='/ingredients/:id'>
          <p>NewPAGE</p>
        </Route>
      </Switch>
      {background &&
        <Route path='/ingredients/:id' children={<Modal title='Детали ингредиента'><IngredientDetails></IngredientDetails></Modal>}>

        </Route>

      }
    </div >
  );
}

export default App;
