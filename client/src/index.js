import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails/PostDetails";

// simple-peer / for 'process is not defined'

import * as process from "process";

window.global = window;
window.process = process;
window.Buffer = [];

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/post/:id",
        element: <PostDetails />,
      },
    ],
  },
]);

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);
