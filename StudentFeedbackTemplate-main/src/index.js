

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { AuthContextProvider } from './context/authContext';
ReactDOM.render(
  <BrowserRouter>
  <AuthContextProvider>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
