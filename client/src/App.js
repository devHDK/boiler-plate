import React from "react";

import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/Login" element={<LoginPage />} />
        <Route exact path="/Register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
