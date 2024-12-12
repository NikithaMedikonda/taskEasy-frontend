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

  const submitLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login data submitted:", userData);
  };

  return (
    <div className="login-register-backgroundImage">
      <div className="login-register-container">
        <h1>Welcome Back to TaskEasy!!</h1>
        <h2>Login</h2>
        <form className="login-register-form" onSubmit={submitLoginForm}>
          <input
            className="login-register-input"
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleChangeInInput}
            required
          />
          <input
            className="login-register-input"
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChangeInInput}
            required
          />
          <button type="submit" className="login-register-submit-button">
            Submit
          </button>
        </form>
        <h3>
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="spanContent"
          >
            Register
          </span>
        </h3>
      </div>
    </div>
  );
};

export default UserLoginPage;
