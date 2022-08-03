import React, { useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from "../app-header/app-header"
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, HIDE_MODAL_INGREDIENT } from '../../services/actions/ingredients';

import ProtectedRoute from '../protected-route';

import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegistrationPage from '../../pages/registration';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import { AUTH_CHECKED, getUser, updateToken } from "../../services/actions/user";
import { getCookie } from '../../utils/utils';
import IngredientPage from "../../pages/ingredient-page";
import { HIDE_ORDER_MODAL } from "../../services/actions";
import OrderFeedPage from "../../pages/order-feed-page";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const background = location.state?.background;

  const { password } = useSelector(store => store.user.user)

  useEffect(() => {
    if (getCookie('refreshToken') && !getCookie('accessToken')) {
      dispatch(updateToken(getCookie("refreshToken")));
      dispatch(getUser())
      // console.log(1)
    } else if (getCookie('accessToken')) {
      dispatch(getUser());
    } else {
      dispatch({type: AUTH_CHECKED});
    }
  }, []);

  // useEffect(() => {
  //   if (getCookie('refreshToken') && !getCookie('accessToken')) {
  //     dispatch(updateToken(getCookie('refreshToken')))
  //   }
  //   dispatch(getUser(password))
  // }, []);


  return (
    <div className={appStyles.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/feed' exact={true}>
          <OrderFeedPage></OrderFeedPage>
        </Route>
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
          <IngredientPage></IngredientPage>
        </Route>
      </Switch>
      {background &&
        <Route path='/ingredients/:id' children={<Modal onClose={() => history.goBack()} title='Детали ингредиента'><IngredientDetails></IngredientDetails></Modal>}>

        </Route>

      }
    </div >
  );
}

export default App;
