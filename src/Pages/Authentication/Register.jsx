import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log('data from register page', data);
    const profileImg = data.image[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log("register page", result.user);
        // store the image in the form data
        const formData = new FormData();
        formData.append('image',profileImg);
        // send the photo to store and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`
        axios.post(image_API_URL, formData)
        .then((res) => {
          console.log('after image upload', res.data.data.url)
          // update user profile to firebase
          const userProfile = {
            displayName : data.name,
            photoURL : res.data.data.url
          }
          updateUserProfile(userProfile)
          .then(() => {
            console.log('user profile updated done');
            navigate(location.state || '/')
        })
        .catch(error => {
          console.log(error);
          setError(error.message);
        })
      })
    })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-600">name must required</p>
              )}
              {/* image */}
              <label className="label">Image</label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input"
                placeholder="Your Image"
              />
              {errors.image?.type === "required" && (
                <p className="text-red-600">image must required</p>
              )}
              {/* email */}
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
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                  })}
                  className="input"
                  placeholder="Password"
                />
                <button
                  className="absolute right-6 bottom-3"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <FaEye /> : <FaRegEyeSlash />}
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
                    password must have one upercase onelower case one number one
                    special character
                  </p>
                )}
                <a className="link link-hover">Forgot password?</a>
                <a className="text-red-600">{error}</a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
              <p>
                Already Have an Account? Please{" "}
                <Link state={location.state || '/'} to="/login">
                  <span className="text-blue-700">Login</span>
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

export default Register;
