import { config } from "../../utils/data";
import { checkResponse, getCookie } from "../../utils/utils";
import { CLEAR_CONSTRUCTOR_LIST } from "./ingredients";
import { AppDispatch, AppThunk, TOrder } from "../../types";

export const MAKE_ORDER_REQUEST: "MAKE_ORDER_REQUEST"  = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_SUCCESS:"MAKE_ORDER_SUCCESS"  = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED: "MAKE_ORDER_FAILED" = "MAKE_ORDER_FAILED";


export const HIDE_ORDER_MODAL: "HIDE_ORDER_MODAL" = "HIDE_ORDER_MODAL";
export const SHOW_ORDER_MODAL: "SHOW_ORDER_MODAL"= "SHOW_ORDER_MODAL";

export interface IMakeOrderRequest {
  type: typeof MAKE_ORDER_REQUEST,

}

export interface IMakeOrderSuccess {
  type: typeof MAKE_ORDER_SUCCESS,
  currentOrder: TOrder // TOrder
}

export interface IMakeOrderFailed {
  type: typeof MAKE_ORDER_FAILED
}

export interface IHideOrderModal {
  type: typeof HIDE_ORDER_MODAL;
}

export interface IShowOrderModal {
  type: typeof SHOW_ORDER_MODAL;
}

export type TMakeOrderActions =
  | IMakeOrderSuccess
  | IMakeOrderFailed
  | IMakeOrderRequest
  | IShowOrderModal
  | IHideOrderModal



export const makeOrder: AppThunk = (ingredients: any) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST,
    })
    fetch(`${config.baseUrl}/orders`, {
      method: "POST",
      headers: {
        ...config.headers,
        Authorization: 'Bearer '+ getCookie('accessToken')},
      body: JSON.stringify({
        ingredients: [...ingredients]
      })
    })
      .then(checkResponse)
      .then((res) => {
        console.log(res);
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          currentOrder: res,
        })
        dispatch({
          type: SHOW_ORDER_MODAL,
        })
        dispatch({ type: CLEAR_CONSTRUCTOR_LIST })
      })
      .catch((error) => {
        dispatch({
          type: MAKE_ORDER_FAILED,
        })
        console.log(error);
      })
  }
}