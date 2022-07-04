import { config } from "../../utils.js/data";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';

export const SHOW_MODAL_INGREDIENT = 'SHOW_MODAL_INGREDIENT';
export const HIDE_MODAL_INGREDIENT = 'HIDE_MODAL_INGREDIENT';
export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const REMOVE_BUN_FROM_CONSTRUCTOR = 'REMOVE_BUN_FROM_CONSTRUCTOR';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })
    fetch(config.baseUrl)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка запроса: ${res.status}. Запрос: ${res.url}`)
      })
      .then((res) => dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data,
      }))
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
        console.log(error)
      })
  }
}

