import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router}>
          <App />
          <ToastContainer className="flex justify-center" />
        </RouterProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
