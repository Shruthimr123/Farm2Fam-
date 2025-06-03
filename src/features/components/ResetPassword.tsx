import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  const { register, handleSubmit, formState: { errors } } = useForm<{
    password: string;
  }>();
  const onSubmit = async (data: { password: string }) => {
    try {
      await axios.post("http://localhost:3000/auth/reset-password", {
        password: data.password,
        token,
      });
      alert("Password reset successful");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      alert("Failed to reset password");
    }
  };


  return (
    <div className="body">
      <div className="login-container">
        <h2 className="login">Reset Password</h2>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="login-input"
            type="password"
            placeholder="New Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

          <button className="login-btn" type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
