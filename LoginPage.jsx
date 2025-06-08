import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", token);
    navigate("/admin/logs");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto space-y-4">
      <h2 className="text-xl">Admin Login</h2>
      <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter admin token" className="border p-2 w-full" />
      <button className="bg-black text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}