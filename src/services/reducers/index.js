import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { HIDE_ORDER_MODAL, MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, SHOW_ORDER_MODAL, UPDATE_ORDER_LIST } from "../actions";

const initialState = {
  currentOrder: {},
  modalOrderIsOpened: false,
  makeOrderRequest: false,
  makeOrderFailed: false
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ORDER_MODAL:
      return {
        ...state,
        modalOrderIsOpened: true,
      }
    case HIDE_ORDER_MODAL:
      return {
        ...state,
        modalOrderIsOpened: false,
      }
    case MAKE_ORDER_REQUEST:
      return {
        ...state,
        makeOrderRequest: true,
        makeOrderFailed: false,
      }
    case MAKE_ORDER_FAILED:
      return {
        ...state,
        makeOrderRequest: false,
        makeOrderFailed: true,
      }
    case MAKE_ORDER_SUCCESS:
      return {
        ...state,
        makeOrderRequest: false,
        makeOrderFailed: false,
        currentOrder: action.currentOrder,
      }
    default:
      return state
  }
}


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
})