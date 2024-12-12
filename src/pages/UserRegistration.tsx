import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/user-login-register-styles.css";

const UserRegistrationPage: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChangeInInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitRegisterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register data submitted:", userData);
  };

  return (
    <div className="login-register-backgroundImage">
      <div className="login-register-container">
        <h1>Register an Account to TaskEasy!!</h1>
        <h2>Register</h2>
        <form className="login-register-form" onSubmit={submitRegisterForm}>
          <input
            className="login-register-input"
            type="text"
            name="username"
            placeholder="Username"
            data-testid="username"
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
          <input
            className="login-register-input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChangeInInput}
            required
          />
          <button type="submit" className="login-register-submit-button">
            Submit
          </button>
        </form>
        <h3>
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="spanContent"
          >
            Login
          </span>
        </h3>
      </div>
    </div>
  );
};

export default UserRegistrationPage;
