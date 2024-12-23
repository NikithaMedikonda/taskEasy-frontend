import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../UserLogin/user-login-register-styles.css";
import { useUserContext } from "../../context/UserContext";
import { registerUser } from "../../api/userRegisterApi";

interface RegisterFormInputs {
  username: string;
  password: string;
  confirmPassword: string;
}

const UserRegistrationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const submitRegisterForm: SubmitHandler<RegisterFormInputs> = async (
    data
  ) => {
    try {
      const result = await registerUser(data);
      setUser(result);
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message || "An error occurred during registration");
    }
  };

  return (
    <div className="login-register-backgroundImage">
      <div className="login-register-container">
        <h1>Register an Account to TaskEasy!!</h1>
        <h2>Register</h2>
        <form
          className="login-register-form"
          onSubmit={handleSubmit(submitRegisterForm)}
        >
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
          <input
            className="login-register-input"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm password!",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords should match!";
                },
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
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
