import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.ts";
import React from "react";
import RouterComponent from "./Route/Routes.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "styled-components";
import { lightPinkTheme } from "./components/resize/theme.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={lightPinkTheme}>
        <NextUIProvider>
          <RouterComponent />
        </NextUIProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);