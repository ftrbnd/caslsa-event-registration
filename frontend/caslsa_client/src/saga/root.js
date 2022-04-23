import { all } from "redux-saga/effects";
import { watchAuth } from "./auth";
import { watchEvents } from "./events";
import { watchUser } from "./user";

export default function* rootSaga() {
  yield all([watchAuth(), watchUser(), watchEvents()]);
}
