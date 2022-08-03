import { Middleware, MiddlewareAPI } from 'redux';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDER, WS_SEND_ORDER
} from "../services/actions/webSocket";
import { getCookie } from "../utils/utils";

export const socketMiddleWare = (wsActions) => {
  return store => {
    let socket = null
    let url = ''
    return next => action => {

      const {dispatch} = store;
      const {type, payload} = action;
      // const token = auth ? getCookie('accessToken') : null;
      const {wsInit, onOpen, onError, onMessage, onClose, wsSendOrder } = wsActions;

      if (type === wsInit) {
        url = payload;
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = event => {
          console.log(event);
          dispatch({type: onOpen, payload: event});
        }

        socket.onerror = event => {
          console.log(event);
          dispatch({type: onError, payload: event});
        }
        socket.onmessage = event => {
          console.log(event);
          const {data} = event;
          const parsedData = JSON.parse(data);
          const { success, ...rest } = parsedData
          dispatch({type: onMessage, payload: rest});
        }
        socket.onclose = event => {
          dispatch({type: onClose, payload: event})
        }
        if (type === WS_SEND_ORDER) {
            const order = payload;
            socket.send(JSON.stringify(order));
        }
      }
      next(action);
    }
  }
}