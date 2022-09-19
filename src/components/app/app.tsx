import React, { useEffect } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import ProtectedRoute from '../protected-route';

import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegistrationPage from '../../pages/registration';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import { AUTH_CHECKED, getUser, updateToken } from '../../services/actions/user';
import { getCookie } from '../../utils/utils';
import IngredientPage from '../../pages/ingredient-page';
import OrderFeedPage from '../../pages/order-feed-page';
import OrderInfo from '../order-info/order-info';
import OrderPage from '../../pages/order-page';
import { TIngredient, TOrder } from '../../types';
import { useDispatch } from '../../hooks';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation<{background: string, orderItem: TOrder}>();
  const background = location.state?.background;
  const order = location.state?.orderItem;

  useEffect(() => {
    if (getCookie('refreshToken') && !getCookie('accessToken')) {
      dispatch(updateToken(getCookie('refreshToken')));
      dispatch(getUser());
      // console.log(1)
    } else if (getCookie('accessToken')) {
      dispatch(getUser());
    } else {
      dispatch({ type: AUTH_CHECKED });
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
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */ }
      <Switch location={background || location}>
        <Route path="/feed" exact>
          <OrderFeedPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <ProtectedRoute path="/login" exact>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute path="/register" exact>
          <RegistrationPage />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" exact>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" exact>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          <IngredientPage />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderPage type="feed" />
        </Route>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderPage type="profile" />
        </ProtectedRoute>

      </Switch>
      {background
        && (
        <>
          {/* eslint-disable-next-line react/no-children-prop */}
          <Route path="/ingredients/:id" children={<Modal onClose={() => history.goBack()} titleStyles="text text_type_main-large" title="Детали ингредиента"><IngredientDetails /></Modal>} />
          {/* eslint-disable-next-line react/no-children-prop */}
          <Route path="/feed/:id" children={<Modal onClose={() => history.goBack()} titleStyles="text text_type_digits-default" title={`${order ? `#${order.number}` : ' '}`}><OrderInfo /></Modal>} />
          {/* eslint-disable-next-line react/no-children-prop */}
          <ProtectedRoute exact path="/profile/orders/:id" children={<Modal onClose={() => history.goBack()} title={' '}><OrderInfo /></Modal>} />
        </>
        )}
    </div>
  );
}

export default App;
