import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const httpClientForCredentials = axios.create({
  baseURL: "https://nodestudy-34u2.onrender.com",

  // 서버와 클라이언트가 다른 도메인일 경우 필수
  withCredentials: true,
});

const asynsLoginFetch = createAsyncThunk(
  "userSlice/asynLoginFetch",
  async (formdata) => {
    const resp = await httpClientForCredentials.post(
      "/api/users/login",
      formdata
    );
    return resp.data;
  }
);

const asynsRegisterFetch = createAsyncThunk(
  "userSlice/asynsRegisterFetch",
  async (formdata) => {
    const resp = await axios.post(
      "https://nodestudy-34u2.onrender.com/api/users/register",
      formdata
    );
    return resp.data;
  }
);

const asynsAuth = createAsyncThunk("userSlice/asynsAuth", async () => {
  const response = await httpClientForCredentials.get("/api/users/auth");
  return response.data;
});

const asynsLogout = createAsyncThunk("userSlice/asynsLogout", async () => {
  const response = await httpClientForCredentials.get("/api/users/logout");
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: { value: {}, auth: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asynsLoginFetch.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asynsLoginFetch.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = "complete";
      httpClientForCredentials.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.accesstoken}`;
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
      // refresh토큰으로 재발급 받은 accesstoken 헤더에 default로 넣기
      if (action.payload.accesstoken) {
        httpClientForCredentials.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${action.payload.accesstoken}`;
      }
    });
    builder.addCase(asynsLogout.fulfilled, (state, action) => {
      state.auth = action.payload;
      // accesstoken default삭제
      httpClientForCredentials.defaults.headers.common["Authorization"] = "";
    });
  },
});

export const { login } = userSlice.actions;
export { asynsLoginFetch, asynsRegisterFetch, asynsAuth, asynsLogout };
export default userSlice.reducer;
