import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS, WS_GET_ORDER
} from "../actions/webSocket";


const initialState = {
  wsConnected: false,
  orders: [],
  error: undefined,
}

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      }
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      }
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      }
    case WS_GET_ORDER:
      return {
        ...state,
        error: undefined,
        orders: [...state.orders, action.payload]
      }
    default:
      return state
  }
}