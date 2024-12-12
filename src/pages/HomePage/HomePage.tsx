import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage-styles.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-backgroundImage">
      <div className="homepage-container">
        <h1>Task Easy</h1>
        <h2>Let's Get Started!</h2>
        <div className="homepage-button-container">
          <button
            className="homepage-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="homepage-button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
