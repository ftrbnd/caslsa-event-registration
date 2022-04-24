import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/root";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import rootSaga from "../saga/root";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const enhancers = [];
  const middleware = [];

  middleware.push(sagaMiddleware);
  enhancers.push(applyMiddleware(...middleware));

  const store = createStore(persistedReducer, compose(...enhancers));
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};

const stores = configureStore();

export default stores;
