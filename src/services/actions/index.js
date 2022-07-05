import { config } from "../../utils.js/data";

export const MAKE_ORDER_REQUEST = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";


export const HIDE_ORDER_MODAL = "HIDE_ORDER_MODAL";
export const SHOW_ORDER_MODAL = "SHOW_ORDER_MODAL";


export function makeOrder(ingredients) {
  return function (dispatch) {
    dispatch({
      type: MAKE_ORDER_REQUEST,
    })
    fetch(config.orderUrl, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        ingredients: [...ingredients]
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка запроса: ${res.status}. Запрос: ${res.url}`)
      })
      .then((res) => {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          currentOrder: res,
        })
        dispatch({
          type: SHOW_ORDER_MODAL,
        })
      })
      .catch((error) => {
        dispatch({
          type: MAKE_ORDER_FAILED,
        })
        console.log(error);
      })
  }
}