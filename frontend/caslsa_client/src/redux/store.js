import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/root";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import rootSaga from "../saga/root";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

sagaMiddleware.run(rootSaga);

export default store;
