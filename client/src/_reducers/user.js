import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const asynsLoginFetch = createAsyncThunk(
  "userSlice/asynLoginFetch",
  async (formdata) => {
    console.log("formdata", formdata);
    const resp = await axios.post("/api/users/login", formdata);
    return resp.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: { value: {} },
  reducers: {
    // login: async (state, action) => {
    //   const req = await axios.post("/api/users/login", action.payload);
    //   state.value = {};
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(asynsLoginFetch.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asynsLoginFetch.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = "complete";
    });
    builder.addCase(asynsLoginFetch.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export const { login } = userSlice.actions;
export { asynsLoginFetch };
export default userSlice.reducer;
