import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout.jsx";
import { routes } from "./config/routes.js";
import React from "react";

function App() {
  return (
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    className="z-[9999]" />
  );
}

export default App;