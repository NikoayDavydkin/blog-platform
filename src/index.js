/* eslint-disable import/no-unresolved */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import { reducer } from './reducer';

const composeEnchancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const loggerMidleware = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};

const store = createStore(reducer, composeEnchancers(applyMiddleware(loggerMidleware)));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
