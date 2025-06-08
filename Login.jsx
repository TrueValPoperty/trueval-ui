import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const handleLogin = () => {
    localStorage.setItem("adminToken", token);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="text"
          placeholder="Enter admin token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border px-3 py-2 w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
