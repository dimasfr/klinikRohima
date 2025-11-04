import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Cek token di localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // langsung ke dashboard
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(username, password);

      // Simpan token & user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/"); // redirect ke dashboard
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f0ef]">
      <div className="bg-white shadow-lg rounded-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Left side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#f7faf9] w-1/2 p-10">
          <h2 className="text-teal-700 text-2xl font-semibold mb-2">
            Medeva Mint
          </h2>
          <p className="text-gray-700 mb-1 text-lg">Hospital Management</p>
          <p className="text-teal-600 text-xl font-bold mb-6">Klinik Rohima</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Doctor Illustration"
            className="w-64"
          />
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-center text-teal-700 text-2xl font-semibold mb-2">
            Medeva Mint
          </h2>
          <h3 className="text-center text-gray-700 text-lg font-medium">
            Welcome Back
          </h3>
          <p className="text-center text-gray-500 text-sm mb-8">
            Silahkan login
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Username */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md p-2 pr-10 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {loading ? "Memproses..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
