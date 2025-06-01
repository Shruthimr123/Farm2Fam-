import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { signUpAPI } from "../api/auth/signupApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Signup.css";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, signUpSchemaType } from "./SignUpSchema";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  //useForm hook for managing form fields 
  //zodResolver binds zod validation
  //register{...} connects input field to form state
  //errors displays validation error from each field
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<signUpSchemaType>({ resolver: zodResolver(signUpSchema) })

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // const handleSignUp = async (data:signUpSchemaType) => {

  //   e.preventDefault();
  //   await dispatch(signUpAPI({ name, username, email, password, phone }));
  // };
  const handleSignUp = async (data: signUpSchemaType) => {
    const { name, email, password, phone } = data
    await dispatch(signUpAPI({ name, email, password, phone }))
      .unwrap()
      .then(() => {
        alert("signUp Sucessful")
        navigate('/login')
      })
      .catch(() => {
        alert("signIn Failed")
      })
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="signup">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <input
            type="text"
            className="input"
            placeholder="Name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            {...register('name')}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
         
          <input
            type="email"
            className="input"
            placeholder="Email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            {...register('email')}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
          <input
            type="password"
            className="input"
            placeholder="Password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            {...register('password')}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            // name="confirmPassword"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
          <input
            type="tel"
            className="input"
            placeholder="Phone"
            // value={phone}
            // onChange={(e) => setPhone(e.target.value)}
            {...register('phone')}

          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          <p style={{ marginTop: "10px" }}>
            Already have an account? <a className="login-link" href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
