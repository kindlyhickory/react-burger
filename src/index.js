import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from "./components/app/app";
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { rootReducer } from './services/reducers';
import { BrowserRouter as Router } from "react-router-dom";
import { socketMiddleWare } from "./middlewares/socketMiddleWare";
import { wsActions } from "./services/actions/webSocket";


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleWare('wss://norma.nomoreparties.space/orders/all', wsActions, false)));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />

    </Router>
  </Provider>,
  document.getElementById('root')
);
