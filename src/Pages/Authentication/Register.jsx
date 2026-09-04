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
        email: data.email,
        displayName: data.name,
        photoURL: imageURL,
      };

      axiosSecure.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          console.log("user created at the database");
        }
      });

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
    <div className="min-h-[calc(100vh-72px)] bg-base-200 px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-lg">
        {/* Register Card */}
        <div className="overflow-hidden rounded-3xl bg-base-100 shadow-xl">
          {/* Header */}
          <div className="bg-primary px-6 py-8 text-center text-primary-content sm:px-10">
            <h1 className="text-3xl font-bold tracking-tight">
              Create Your Account
            </h1>

            <p className="mt-2 text-sm opacity-90">
              Join ScholarHub and discover scholarship opportunities
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <form onSubmit={handleSubmit(handleRegister)}>
              <fieldset className="space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className={`input h-12 w-full rounded-xl border-base-300 bg-base-100 px-4 focus:border-primary focus:outline-none ${
                      errors.name ? "border-error" : ""
                    }`}
                    placeholder="Enter your full name"
                  />

                  {errors.name?.type === "required" && (
                    <p className="mt-1.5 text-sm text-error">
                      Name is required
                    </p>
                  )}
                </div>

                {/* Image */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Profile Image
                  </label>

                  <input
                    type="file"
                    {...register("image", { required: true })}
                    className={`file-input h-12 w-full rounded-xl border-base-300 bg-base-100 file:mr-4 file:h-full file:border-0 file:bg-primary file:px-4 file:font-medium file:text-primary-content ${
                      errors.image ? "border-error" : ""
                    }`}
                  />

                  {errors.image?.type === "required" && (
                    <p className="mt-1.5 text-sm text-error">
                      Profile image is required
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className={`input h-12 w-full rounded-xl border-base-300 bg-base-100 px-4 focus:border-primary focus:outline-none ${
                      errors.email ? "border-error" : ""
                    }`}
                    placeholder="Enter your email"
                  />

                  {errors.email?.type === "required" && (
                    <p className="mt-1.5 text-sm text-error">
                      Email is required
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                      })}
                      className={`input h-12 w-full rounded-xl border-base-300 bg-base-100 px-4 pr-12 focus:border-primary focus:outline-none ${
                        errors.password ? "border-error" : ""
                      }`}
                      placeholder="Create a strong password"
                    />

                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-base-content/60 transition-colors hover:text-primary"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>

                  {/* Password Validation */}
                  <div className="mt-2 space-y-1">
                    {errors.password?.type === "required" && (
                      <p className="text-sm text-error">Password is required</p>
                    )}

                    {errors.password?.type === "minLength" && (
                      <p className="text-sm text-error">
                        Password must be at least 6 characters long
                      </p>
                    )}

                    {errors.password?.type === "pattern" && (
                      <p className="text-sm text-error">
                        Password must contain uppercase, lowercase, number and
                        special character
                      </p>
                    )}
                  </div>
                </div>

                {/* Server Error */}
                {error && (
                  <div className="rounded-xl border border-error/20 bg-error/10 px-4 py-3">
                    <p className="text-sm text-error">{error}</p>
                  </div>
                )}

                {/* Register Button */}
                <button
                  type="submit"
                  className="btn btn-primary h-12 w-full rounded-xl text-base font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Create Account
                </button>

                {/* Login */}
                <p className="text-center text-sm text-base-content/70">
                  Already have an account?{" "}
                  <Link
                    state={location.state || "/"}
                    to="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </fieldset>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-base-300"></div>
              <span className="text-xs font-medium uppercase text-base-content/50">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-base-300"></div>
            </div>

            {/* Google Login */}
            <GoogleLogin />
          </div>
        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-center text-xs text-base-content/50">
          By creating an account, you agree to use ScholarHub responsibly.
        </p>
      </div>
    </div>
  );
};

export default Register;
