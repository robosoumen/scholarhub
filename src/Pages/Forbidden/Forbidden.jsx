// src/Pages/Forbidden/Forbidden.jsx
import { Link } from "react-router";
import Lottie from "lottie-react";
import forbiddenAnimation from "../../assets/forbidden.json"; // নিজের JSON ফাইল এখানে রাখুন

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
      <div className="w-72 md:w-96">
        <Lottie
          animationData={forbiddenAnimation}
          loop={true}
          autoplay={true}
        />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-error mt-4 text-center">
        Access Forbidden
      </h1>

      <p className="text-gray-500 mt-2 text-center max-w-md">
        দুঃখিত, এই পেজটি দেখার অনুমতি আপনার নেই। আপনার একাউন্টের role অনুযায়ী এই
        অংশে প্রবেশাধিকার সীমাবদ্ধ।
      </p>

      <Link
        to="/"
        className="btn btn-primary mt-6 px-6"
      >
        হোমপেজে ফিরে যান
      </Link>
    </div>
  );
};

export default Forbidden;