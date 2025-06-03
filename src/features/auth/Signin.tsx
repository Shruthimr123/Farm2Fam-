import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAPI } from "../api/auth/loginApi";
import { AppDispatch, RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import "../../styles/Signin.css";
import { loginSchema, loginSchemaType } from "./LoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'

const SignIn: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignIn = async (data: loginSchemaType) => {
    const { email, password } = data
    await dispatch(signInAPI({ email, password }))
      .unwrap()
      .then(() => {
        alert("Login Sucessful")
        navigate('/products')
      })
      .catch(() => {
        alert("Login Failed")
      })
  };

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) })

  return (
    <>
      <div className="body">
        <div className="login-container">
          <h2 className="login">Sign In</h2>
          <form className="login-form" onSubmit={handleSubmit(handleSignIn)}>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          </form>

          <p style={{ marginTop: "20px" }}>
            Don't have an account? <a className="signup-link" href="/">Signup</a>
          </p>
          <p style={{ marginTop: "10px" }}>
            <a href="/forgot-password" className="signup-link">Forgot Password?</a>
          </p>
          {isAuthenticated && <p style={{ color: "green" }}>Login Successfull</p>}
        </div>
      </div>
    </>
  );
};

export default SignIn;

