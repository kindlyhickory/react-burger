import {
  Action, ActionCreator, Dispatch,
} from 'redux';
import { ThunkAction } from 'redux-thunk';
import store from './index';
import { TUserForgotForm } from './services/actions/forgotPassword';
import { TMakeOrderActions } from './services/actions';
import { TIngredientsActions } from './services/actions/ingredients';
import { TLogActions } from './services/actions/login';
import { TProfileEditActions } from './services/actions/profileEdit';
import { TRegistrationActions } from './services/actions/registration';
import { TResetPasswordActions } from './services/actions/resetPassword';
import { TUserActions } from './services/actions/user';
import { TWsActions } from './services/actions/webSocket';

export type TIngredient = {
  id: string;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  // eslint-disable-next-line camelcase
  image_mobile: string;
  // eslint-disable-next-line camelcase
  image_large: string;
  __v?: number;
}

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export type TUser = {
  user: {
    email: string,
    name: string,
  }
  accessToken: string,
  refreshToken: string,
}

export type TUserLog = {
  success: boolean,
}

export type TResponseIngredients = {
  data: Array<TIngredient>
}

export type TSetCookieProps = {
  expires?: number | string;
  path?: string;
} & { [extraParams: string]: string | number | boolean; }

export type RootState = ReturnType<typeof store.getState>

export type TApplicationActions = TUserForgotForm
  | TMakeOrderActions
  | TIngredientsActions
  | TLogActions
  | TProfileEditActions
  | TRegistrationActions
  | TResetPasswordActions
  | TUserActions
  | TWsActions

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
  >;

// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = Dispatch<TApplicationActions>;
