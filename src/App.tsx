import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegistrationPage from "./pages/UserRegistration/UserRegistration";
import UserLoginPage from "./pages/UserLogin/UserLogin";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/DashBoard/Dashboard";
import { UserProvider } from "./context/UserContext";
import AddTaskForm from "./pages/AddTask/AddTask";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/register" element={<UserRegistrationPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/addtask"
            element={<AddTaskForm onSubmit={() => {}} />}
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
