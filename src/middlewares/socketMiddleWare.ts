import { Middleware, MiddlewareAPI } from 'redux';
import { IWsActions } from '../services/actions/webSocket';
import { AppDispatch, RootState } from '../types';

// eslint-disable-next-line max-len
export const socketMiddleWare = (wsActions: IWsActions): Middleware => (store: MiddlewareAPI<AppDispatch, RootState>) => {
  let socket: WebSocket | null = null;
  let url = '';
  return (next) => (action: {type: string, payload: string}) => {
    const { dispatch } = store;
    const { type, payload } = action;
    // const token = auth ? getCookie('accessToken') : null;
    const {
      wsInit, onOpen, onError, onMessage, onClose, wsSendOrder, wsClose,
    } = wsActions;

    if (type === wsInit) {
      url = payload;
      socket = new WebSocket(url);
    }
    if (socket) {
      socket.onopen = (event) => {
        // console.log(socket);
        // console.log(event);
        dispatch({ type: onOpen, payload: event });
      };

      socket.onerror = (event) => {
        console.log(event);
        dispatch({ type: onError, payload: event });
      };
      socket.onmessage = (event) => {
        // console.log(event);
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...rest } = parsedData;
        dispatch({ type: onMessage, payload: rest });
      };
      socket.onclose = (event) => {
        dispatch({ type: onClose, payload: event });
      };
      if (type === wsSendOrder) {
        const order = payload;
        socket.send(JSON.stringify(order));
      }
      if (type === wsClose) {
        socket.close(1000, 'socket closed');
        // console.log(socket);
      }
    }
    next(action);
  };
};
