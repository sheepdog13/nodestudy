import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const asynsLoginFetch = createAsyncThunk(
  "userSlice/asynLoginFetch",
  async (formdata) => {
    const resp = await axios.post(
      "https://nodestudy-34u2.onrender.com/api/users/login",
      formdata,
      {
        withCredentials: true, // 쿠키 전송을 허용하는 옵션
      }
    );
    return resp.data;
  }
);

const asynsRegisterFetch = createAsyncThunk(
  "userSlice/asynsRegisterFetch",
  async (formdata) => {
    console.log("formdata", formdata);
    const resp = await axios.post(
      "https://nodestudy-34u2.onrender.com/api/users/register",
      formdata
    );
    return resp.data;
  }
);

const asynsAuth = createAsyncThunk("userSlice/asynsAuth", async () => {
  const response = await axios.get(
    "https://nodestudy-34u2.onrender.com/api/users/auth"
  );
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: { value: {}, auth: {} },
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
    builder.addCase(asynsRegisterFetch.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = "complete";
    });
    builder.addCase(asynsAuth.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
  },
});

export const { login } = userSlice.actions;
export { asynsLoginFetch, asynsRegisterFetch, asynsAuth };
export default userSlice.reducer;
