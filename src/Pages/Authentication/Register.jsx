import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { imageUpload } from "./utility/imageUpload";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const profileImg = data.image[0];

    try {
      const result = await registerUser(data.email, data.password);
      console.log("register page", result.user);

      const imageURL = await imageUpload(profileImg);

      // create user in the database
      const userInfo = {
        email : data.email,
        displayName : data.name,
        photoURL : imageURL
      }
      axiosSecure.post('/users', userInfo)
      .then(res => {
        if(res.data.insertedId){
          console.log('user created at the database')
        }
      })


      // update user profile to firebase
      const userProfile = {
        displayName: data.name,
        photoURL: imageURL,
      };

      await updateUserProfile(userProfile);

      navigate(location.state || "/");
    } catch (error) {
      setError(error.message);
    }
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
                <a className="text-red-600">{error}</a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
              <a className="link link-hover">Forgot password?</a>
              <p>
                Already Have an Account? Please{" "}
                <Link state={location.state || "/"} to="/login">
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
