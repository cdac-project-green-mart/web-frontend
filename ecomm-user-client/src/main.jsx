import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router.jsx";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Router />
    </BrowserRouter>
  </StrictMode>
);
