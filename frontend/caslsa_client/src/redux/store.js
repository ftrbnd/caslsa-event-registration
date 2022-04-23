import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/root";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import rootSaga from "../saga/root";

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const enhancers = [];
  const middleware = [];

  middleware.push(sagaMiddleware);
  enhancers.push(applyMiddleware(...middleware));

  const store = createStore(rootReducer, compose(...enhancers));
  sagaMiddleware.run(rootSaga);

  return store;
};

const store = configureStore();

export default store;
