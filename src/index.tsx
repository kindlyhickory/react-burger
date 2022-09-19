import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { rootReducer } from './services/reducers';
import App from './components/app/app.js';
import { socketMiddleWare } from './middlewares/socketMiddleWare.js';
import { wsActions } from './services/actions/webSocket';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//   : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleWare(wsActions)),
);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />

    </Router>
  </Provider>,
  document.getElementById('root'),
);

export default store;
