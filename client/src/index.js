import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import { thunk } from "redux-thunk";
import rootReducer from "./_reducers";

const createStoreMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk
)(createStore);

const queryCient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider
    store={createStoreMiddleware(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXENSION__ && window.__REDUX_DEVTOOLS_EXENSION__()
    )}
  >
    <QueryClientProvider client={queryCient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
