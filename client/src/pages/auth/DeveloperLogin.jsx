import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const DeveloperLogin = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = "Please provide a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!validate()) {
      return;
    }

    const result = await login({ email, password });

    if (result.success) {
      navigate("/developer/dashboard");
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Developer Login</h1>
      <p className="mt-1 text-sm text-gray-500">Sign in to your developer account</p>

      {errorMessage && (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 pr-16 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 mt-1 flex items-center px-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Signing in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        New here?{" "}
        <Link
          to="/developer/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default DeveloperLogin;
