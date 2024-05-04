import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import ThemeToggler from "./components/ThemeToggler";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="absolute top-0 right-0 m-4">
          {" "}
          {/* Обертываем ThemeToggler в div и применяем классы к нему */}
          <ThemeToggler />
        </div>
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default App;
