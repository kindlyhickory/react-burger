import { store } from "./index";
import { Action, ActionCreator, compose, Dispatch } from "redux";
import { TUserForgotForm } from "./services/actions/forgotPassword";
import { TMakeOrderActions } from "./services/actions";
import { TIngredientsActions } from "./services/actions/ingredients";
import { TLogActions } from "./services/actions/login";
import { TProfileEditActions } from "./services/actions/profileEdit";
import { TRegistrationActions } from "./services/actions/registration";
import { TResetPasswordActions } from "./services/actions/resetPassword";
import { TUserActions } from "./services/actions/user";
import { TWsActions } from "./services/actions/webSocket";
import { ThunkAction } from "redux-thunk";

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
  image_mobile: string;
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