import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BASE_URL from "../api/baseUrl";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user & token in context
      login(data.data, data.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (

  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex flex-col">

```
{/* ⭐ App Header */}
<div className="text-center py-6">
  <h1 className="text-3xl font-bold text-blue-700">
    Task Management App
  </h1>
  <p className="text-gray-500 text-sm mt-1">
    Smart workflow • Role based access • Productivity boost
  </p>
</div>

{/* ⭐ Login Card */}
<div className="flex flex-1 items-center justify-center px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
      Welcome Back 👋
    </h2>

    {error && (
      <p className="text-red-500 text-sm text-center mb-4 bg-red-50 py-2 rounded">
        {error}
      </p>
    )}

    <div className="space-y-4">

      {/* Email */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
      />

      {/* Button */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex justify-center items-center gap-2 transition disabled:opacity-50"
      >
        {loading ? <Spinner /> : "Login"}
      </button>
    </div>

    <p className="text-sm text-center text-gray-600 mt-6">
      Don’t have an account?{" "}
      <Link
        to="/register"
        className="text-blue-600 font-medium hover:underline"
      >
        Register
      </Link>
    </p>

  </div>
</div>
```

  </div>
);

}

export default Login;