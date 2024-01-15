import { configureStore } from "@reduxjs/toolkit";
import reducer from "../_reducers/rootReducer";

const store = configureStore({
  reducer,
});

export default store;
