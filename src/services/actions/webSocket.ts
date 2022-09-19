import { TOrder } from '../../types';

export const WS_CONNECTION_START:'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS:'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR:'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE:'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED:'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDER:'WS_GET_ORDER' = 'WS_GET_ORDER';
export const WS_SEND_ORDER:'WS_SEND_ORDER' = 'WS_SEND_ORDER';

export interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR;
  payload: object;
}

export interface IWsConnectionClose {
  type: typeof WS_CONNECTION_CLOSE
}

export interface IWsConnectionClosed {
  type: typeof WS_CONNECTION_CLOSED
}

export interface IWsGetOrder {
  type: typeof WS_GET_ORDER;
  payload: {
    orders: ReadonlyArray<TOrder>;
    total: number;
    totalToday: number;
  }
}

export interface IWsSendOrder {
  type: typeof WS_SEND_ORDER
}

export interface IWsConnectionStart {
  type: typeof WS_CONNECTION_START
}

export type TWsActions =
  | IWsConnectionStart
  | IWsSendOrder
  | IWsGetOrder
  | IWsConnectionClosed
  | IWsConnectionClose
  | IWsConnectionError
  | IWsConnectionSuccess

export interface IWsActions {
  wsInit: typeof WS_CONNECTION_START;
  wsClose: typeof WS_CONNECTION_CLOSE;
  wsSendOrder: typeof WS_SEND_ORDER;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_ORDER;
}

export const wsActions: IWsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  wsSendOrder: WS_SEND_ORDER,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDER,
};
