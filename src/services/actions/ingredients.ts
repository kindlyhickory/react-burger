import { config } from '../../utils/data';
import { checkResponse } from '../../utils/utils';
import {
  AppDispatch, AppThunk, TIngredient, TResponseIngredients,
} from '../../types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' as const;
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED' as const;

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR' as const;
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR' as const;

export const SHOW_MODAL_INGREDIENT = 'SHOW_MODAL_INGREDIENT' as const;
export const HIDE_MODAL_INGREDIENT = 'HIDE_MODAL_INGREDIENT' as const;
export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR' as const;
export const REMOVE_BUN_FROM_CONSTRUCTOR = 'REMOVE_BUN_FROM_CONSTRUCTOR' as const;

export const UPDATE_CONSTRUCTOR_LIST = 'UPDATE_CONSTRUCTOR_LIST' as const;

export const CLEAR_CONSTRUCTOR_LIST = 'CLEAR_CONSTRUCTOR_LIST' as const;

export interface IAddIngredientToConstructor {
  type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  ingredient: TIngredient;
}

export interface IUpdateConstructorList {
  type: typeof UPDATE_CONSTRUCTOR_LIST;
  toIndex: number;
  fromIndex: number;
}
export interface IClearConstructorList {
  type: typeof CLEAR_CONSTRUCTOR_LIST;
}

export interface IShowModalIngredient {
  type: typeof SHOW_MODAL_INGREDIENT;
  currentViewedIngredient: TIngredient // TIngredient
}

export interface IHideModalIngredient {
  type: typeof HIDE_MODAL_INGREDIENT;
}

export interface IAddBunToConstructor {
  type: typeof ADD_BUN_TO_CONSTRUCTOR;
  bun: TIngredient;
}

export interface IRemoveBunFromConstructor {
  type: typeof REMOVE_BUN_FROM_CONSTRUCTOR;
}

export interface IRemoveIngredientToConstructor {
  type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  ingredient: TIngredient // TIngredient
}
export interface IGetIngredientsRequest {
  type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: ReadonlyArray<TIngredient> // TIngredient
}
export interface IGetIngredientsFailed {
  type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IGetIngredientsFailed
  | IGetIngredientsSuccess
  | IGetIngredientsRequest
  | IRemoveIngredientToConstructor
  | IRemoveBunFromConstructor
  | IAddBunToConstructor
  | IHideModalIngredient
  | IShowModalIngredient
  | IClearConstructorList
  | IUpdateConstructorList
  | IAddIngredientToConstructor

// eslint-disable-next-line func-names
export const getIngredients: AppThunk = () => function (dispatch: AppDispatch) {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  fetch(`${config.baseUrl}/ingredients`)
    .then((res) => checkResponse<TResponseIngredients>(res))
    .then((res) => dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: res.data,
    }))
    .catch((error) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
      // eslint-disable-next-line no-console
      console.log(error);
    });
};
