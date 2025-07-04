import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Assuming you use react-router-dom
import { Loader2 } from "lucide-react"; // Re-using the loading spinner

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/v1";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/user/login`, {
        email,
        password,
      });

      if (res.status === 200 && res.data.token) {
        console.log("Logged in successfully");
        // Store the token and redirect
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard"); // Redirect to the user's dashboard
      }
    } catch (err: any) {
      // Set a user-friendly error message
      const errorMessage =
        err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/70 mt-2">
            Log in to access your second brain.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Form Error Display */}
          {error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              required
              className="w-full bg-black/20 text-white placeholder:text-white/50 border border-white/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-white/80 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              required
              className="w-full bg-black/20 text-white placeholder:text-white/50 border border-white/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-white/80 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-white/60 mt-8">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-white hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;