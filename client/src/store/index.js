import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../_reducers/user";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
