import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const asynsLoginFetch = createAsyncThunk(
  "userSlice/asynLoginFetch",
  async (formdata) => {
    console.log("formdata", formdata);
    // try {
    const resp = await axios.post("/api/users/login", formdata);
    console.log("resp.data", resp.data);
    return resp.data;
    // } catch (err) {
    //   return "err";
    // }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: { value: {} },
  reducers: {
    login: async (state, action) => {
      const req = await axios.post("/api/users/login", action.payload);
      console.log(req.data);
      state.value = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asynsLoginFetch.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asynsLoginFetch.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
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
