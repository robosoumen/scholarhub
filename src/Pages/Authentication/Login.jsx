import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location.state || '/')
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600">email must required</p>
              )}
              {/* password */}
              <div className="relative">
                <label className="label">Password</label>
                <input
                  type={showPassword ? 'text' : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                  })}
                  className="input"
                  placeholder="Password"
                />
                <button onClick={handleShowPassword} className="absolute bottom-4 right-6">
                  {
                    showPassword ? <FaEye /> : <FaRegEyeSlash />
                  }
                </button>
              </div>
              <div>
                {errors.password?.type === "required" && (
                  <p className="text-red-600">password must required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    password must at least 6 character or long
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    password must have one upperCase oneLower case one number
                    one special character
                  </p>
                )}
                <a className="link link-hover">Forgot password?</a>
                <a className="text-red-500">{error}</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
              <p>
                Don't Have an Account? Please{" "}
                <Link state={location.state || '/'} to="/register">
                  <span className="text-blue-700">Register</span>
                </Link>
              </p>
            </fieldset>
          </form>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
