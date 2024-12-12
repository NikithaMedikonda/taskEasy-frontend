import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/user-login-register-styles.css";

const UserLoginPage: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChangeInInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  function handleLogin() {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="backgroundImage">
      <div className="container">
        <h1>Welcome Back to TaskEasy!!</h1>
        <h2>Login</h2>
        <div className="form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleChangeInInput}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChangeInInput}
            required
          />
          <button
            type="submit"
            className="button"
            onClick={() => {
              handleLogin();
            }}
          >
            Submit
          </button>
        </div>
        <h4>
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="spanContent"
          >
            Register
          </span>
        </h4>
      </div>
    </div>
  );
};

export default UserLoginPage;
