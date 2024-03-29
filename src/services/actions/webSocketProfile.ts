export const WS_CONNECTION_PROFILE_START:'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_PROFILE_SUCCESS:'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_PROFILE_ERROR:'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_PROFILE_CLOSED:'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDER_PROFILE:'WS_GET_ORDER' = 'WS_GET_ORDER';
export const WS_SEND_ORDER_PROFILE:'WS_SEND_ORDER' = 'WS_SEND_ORDER';

export interface IWsConnectionProfileStart {
  type: typeof WS_CONNECTION_PROFILE_START
}

export interface IWsConnectionProfileSuccess {
  type: typeof WS_CONNECTION_PROFILE_SUCCESS
}

export interface IWsConnectionProfileError {
  type: typeof WS_CONNECTION_PROFILE_ERROR
}

export interface IWsConnectionProfileClosed {
  type: typeof WS_CONNECTION_PROFILE_CLOSED
}

export interface IGetOrderProfile {
  type: typeof WS_GET_ORDER_PROFILE
}

export interface ISendOrderProfile {
  type: typeof WS_SEND_ORDER_PROFILE
}

export type TWsProfileActions =
  | ISendOrderProfile
  | IGetOrderProfile
  | IWsConnectionProfileClosed
  | IWsConnectionProfileError
  | IWsConnectionProfileSuccess
  | IWsConnectionProfileStart

export interface IWsActionsProfile {
  wsInit: typeof WS_CONNECTION_PROFILE_START;
  // wsClose: WS_CONNECTION_CLOSED,
  wsSendOrder: typeof WS_SEND_ORDER_PROFILE;
  onOpen: typeof WS_CONNECTION_PROFILE_SUCCESS;
  onClose: typeof WS_CONNECTION_PROFILE_CLOSED;
  onError: typeof WS_CONNECTION_PROFILE_ERROR;
  onMessage: typeof WS_GET_ORDER_PROFILE;
}

export const wsActionsProfile = {
  wsInit: WS_CONNECTION_PROFILE_START,
  // wsClose: WS_CONNECTION_CLOSED,
  wsSendOrder: WS_SEND_ORDER_PROFILE,
  onOpen: WS_CONNECTION_PROFILE_SUCCESS,
  onClose: WS_CONNECTION_PROFILE_CLOSED,
  onError: WS_CONNECTION_PROFILE_ERROR,
  onMessage: WS_GET_ORDER_PROFILE,
};
