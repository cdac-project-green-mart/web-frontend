import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router.jsx";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Router />
    </BrowserRouter>
    <ErrorBoundary>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
