import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const enhancers = [];
const middleware = [
  sagaMiddleware
];
/*
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}*/

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

sagaMiddleware.run(sagas);

export default store;
