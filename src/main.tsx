import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.ts";
import React from "react";
import RouterComponent from "./Route/Routes.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightPinkTheme } from "./components/resize/theme.tsx";
import { ThemeProvider } from '@/components/vet_components/theme-provider.tsx';
import { Toaster } from "sonner"
import { UserProvider } from "./Context/UserContext.tsx";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <UserProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <StyledThemeProvider theme={lightPinkTheme}>
            <NextUIProvider>
              <RouterComponent />
              <Toaster />
              <ToastContainer />
            </NextUIProvider>
          </StyledThemeProvider>
        </ThemeProvider>
      </UserProvider>
    </React.StrictMode>
  </Provider>
);