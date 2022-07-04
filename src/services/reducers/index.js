import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { HIDE_ORDER_MODAL, SHOW_ORDER_MODAL } from "../actions";

const initialState = {
  currentOrder: {},
  modalOrderIsOpened: false,
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
    default:
      return state
  }
}


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
})