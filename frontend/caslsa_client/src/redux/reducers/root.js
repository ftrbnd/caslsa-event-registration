import { combineReducers } from "redux";
import authReducer from "./auth";
import { eventsReducer } from "./events";
import { userReducer } from "./user";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  events: eventsReducer,
});

export default rootReducer;
