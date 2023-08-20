import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Auth from './components/Auth';
import Nav from './components/Nav';
import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {



    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    )
}

export default App