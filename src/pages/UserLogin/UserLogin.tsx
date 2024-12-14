import React from "react";
import { useNavigate } from "react-router-dom";
import "./user-login-register-styles.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormInputs {
  username: string;
  password: string;
}

const UserLoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const submitLoginForm: SubmitHandler<LoginFormInputs> = (data) => {
    navigate('/dashboard')
    console.log("Login data submitted:", data);
  };

  return (
    <div className="login-register-backgroundImage">
      <div className="login-register-container">
        <h1>Welcome Back to TaskEasy!!</h1>
        <h2>Login</h2>
        <form className="login-register-form" onSubmit={handleSubmit(submitLoginForm)}>
          <input
            className="login-register-input"
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
          <input
            className="login-register-input"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
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
