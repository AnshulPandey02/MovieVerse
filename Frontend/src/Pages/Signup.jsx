import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import LoadingOverlay from "../Components/LoadingOverlay";
import { MovieContext } from "../context/MovieContext";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { setUser } = useContext(MovieContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setError("");

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGoogleSignup = async (response) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/users/google-login`,
        { token: response.credential }
      );

      console.log(res);

      setUser(res.data);

      localStorage.setItem("movieHub_token", res.data.token);
      localStorage.setItem("userIn", true);

      navigate(-1);
    } catch (err) {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const usernameRegex = /^[a-zA-Z0-9._@]+$/;

    if (!usernameRegex.test(form.username)) {
      setError(
        "Username can only contain letters, numbers, dots, underscores, and @."
      );

      setLoading(false);
      return;
    }

    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");

      setLoading(false);
      return;
    }

    // Password must contain at least:
    // one letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]|:;"'<>,.?/]).+$/;

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must contain at least one letter, one number, and one special character."
      );

      setLoading(false);
      return;
    }

    // Check terms agreement
    if (!form.agree) {
      setError("You must agree to the terms & conditions.");

      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/users/signup`,
        form
      );

      console.log(data);

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-max my-10 flex items-center justify-center bg-[#0a0a0a] text-gray-200 px-5">
      {loading && <LoadingOverlay text="Creating your account..." />}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col md:flex-row w-full max-w-4xl bg-[#1a1a1a]/90 rounded-2xl shadow-lg border border-gray-800 overflow-hidden backdrop-blur-md"
      >
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <FaArrowLeft size={18} />

          <span className="hidden sm:inline text-sm font-medium">
            Back
          </span>
        </button>

        {/* Left Side */}
        <div className="md:w-1/2 w-full bg-gradient-to-br from-[#004B6E] to-[#0a0a0a] flex flex-col justify-center items-center p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome to MovieVerse 🎬
          </h2>

          <p className="text-gray-300 mb-6 max-w-sm">
            Discover, track, and favorite your top movies. Create an account or
            join with Google to begin your journey.
          </p>

          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => setError("Google login failed")}
          />

          <div className="mt-6 text-sm text-gray-300">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-[#00A8E1] hover:text-[#00C2FF] font-semibold"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-semibold text-[#00A8E1] mb-5 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <PasswordInput
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              placeholder="••••••••"
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              show={showConfirm}
              toggle={() => setShowConfirm(!showConfirm)}
              placeholder="Re-enter password"
            />

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 accent-[#00A8E1]"
              />

              <p className="text-sm">
                I agree to the{" "}

                <Link
                  to="/terms"
                  className="text-[#00A8E1] hover:text-[#00C2FF] underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}

                <Link
                  to="/privacy"
                  className="text-[#00A8E1] hover:text-[#00C2FF] underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            {error && (
              <p className="text-center text-sm text-red-400 bg-red-950/30 py-2 rounded-lg border border-red-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-gradient-to-r from-[#005C7E] to-[#00A8E1] opacity-70 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#005C7E] to-[#00A8E1] hover:from-[#00739D] hover:to-[#00C2FF] hover:shadow-[0_0_10px_#00A8E1] text-white"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// Reusable Input
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>

      <input
        {...props}
        required
        className="w-full p-3 rounded-lg bg-[#111] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00A8E1]"
      />
    </div>
  );
}

// Password Input
function PasswordInput({ label, show, toggle, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...props}
          required
          className="w-full p-3 rounded-lg bg-[#111] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00A8E1] pr-10"
        />

        <span
          onClick={toggle}
          className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
        >
          {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </span>
      </div>
    </div>
  );
}