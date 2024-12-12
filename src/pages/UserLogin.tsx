import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLoginPage: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChangeInInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  function handleLogin() {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container">
      <h1 className="welcome-heading">Welcome Back to TaskEasy!!</h1>
      <h3 className="page-heading">Login</h3>
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
      <h5>
      Don't have an account?{" "}
        <span
          onClick={() => {
            navigate("/register");
          }}
          className="spanContent"
        >
          Register
        </span>
      </h5>
    </div>
  );
};

export default UserLoginPage;