import {
  TWsActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS, WS_GET_ORDER
} from "../actions/webSocket";
import { TOrder } from "../../types";
import { TWsProfileActions } from "../actions/webSocketProfile";


type TWsSocketProfileState = {
  wsConnected: boolean;
  orders: ReadonlyArray<TOrder>;
  error: object | undefined;
  total: number;
  totalToday: number;
}

const initialState:TWsSocketProfileState = {
  wsConnected: false,
  orders: [],
  error: undefined,
  total: 0,
  totalToday: 0
}

export const wsReducerProfile = (state = initialState, action:TWsActions) => {
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
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }
    default:
      return state
  }
}