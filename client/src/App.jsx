import React from "react";
import Nav from "./components/Nav";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
