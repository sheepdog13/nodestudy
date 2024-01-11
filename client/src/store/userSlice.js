import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.value = state.value + action.payload;
    },
    down: (state, action) => {
      state.value = state.value - action.payload;
    },
    init: (state, action) => {
      state.value = 0;
    },
  },
});

export default counterSlice;
export const { up, down, init } = counterSlice.actions;
