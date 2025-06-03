import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotPasswordType = z.infer<typeof schema>;

const ForgotPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ForgotPasswordType) => {
    try {
      await axios.post("http://localhost:3000/auth/forgot-password", data); // Update URL if needed
      alert("Reset link sent to your email");
    } catch (error: any) {
      alert("Failed to send reset link");
    }
  };

  return (
    <div className="body">
      <div className="login-container">
        <h2 className="login">Forgot Password</h2>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

          <button className="login-btn" type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
