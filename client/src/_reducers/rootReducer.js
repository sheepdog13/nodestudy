import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import darkmode from "./darkmode";

const reducer = combineReducers({
  user,
  darkmode,
});

export default reducer;
