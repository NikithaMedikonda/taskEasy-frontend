import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegistrationPage from "./pages/UserRegistration/UserRegistration";
import UserLoginPage from "./pages/UserLogin/UserLogin";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/register" element={<UserRegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
