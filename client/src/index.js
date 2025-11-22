import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { CookiesProvider } from "react-cookie";
import { Analytics } from "@vercel/analytics/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <React.StrictMode>
      <App />      
      <Analytics mode="development"/>
    </React.StrictMode>
  </CookiesProvider>
);
