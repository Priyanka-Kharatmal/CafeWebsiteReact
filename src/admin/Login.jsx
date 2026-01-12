import React, { useState } from "react";
import loginImage from "../assets/login.png"; // Ensure correct path

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-white font-sans">
      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 py-12">
        {/* Left side image */}
        <div className="hidden md:flex justify-center">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-4/5 max-w-md drop-shadow-lg"
          />
        </div>

        {/* Right side form */}
        <div className="bg-gray-900/80 p-8 rounded-2xl shadow-lg border border-gray-700 w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-500 mb-6">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Please login to continue
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300"
            >
              Login Now
            </button>
          </form>

          {/* Extra links */}
          <div className="text-center mt-6 text-sm text-gray-400">
            <p>
              Don’t have an account?{" "}
              <a href="/register" className="text-amber-500 hover:underline">
                Sign up
              </a>
            </p>
            <p className="mt-2">
              <a href="/forgot-password" className="text-amber-500 hover:underline">
                Forgot password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
