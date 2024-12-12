import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegistrationPage from "./pages/UserRegistration";
import UserLoginPage from "./pages/UserLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLoginPage />} />
        <Route path="/register" element={<UserRegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
