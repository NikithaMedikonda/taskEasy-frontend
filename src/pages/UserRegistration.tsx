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

  function handleSubmit() {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="backgroundImage">
      <div className="container">
        <h1>Welcome to TaskEasy!!</h1>
        <h2>Register</h2>
        <div className="form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            data-testid="username"
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChangeInInput}
            required
          />
          <button
            type="submit"
            className="button"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
        <h4>
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/");
            }}
            className="spanContent"
          >
            Login
          </span>
        </h4>
      </div>
    </div>
  );
};

export default UserRegistrationPage;
