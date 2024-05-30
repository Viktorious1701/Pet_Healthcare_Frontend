import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.ts";

import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Route/Routes.tsx";
import { NextUIProvider } from "@nextui-org/react";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <NextUIProvider>
        <RouterProvider router={router}></RouterProvider>
      </NextUIProvider>
    </React.StrictMode>
  </Provider>
);
