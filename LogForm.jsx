import { useState } from "react";
import { logValuation } from "./api";

export default function LogForm() {
  const [form, setForm] = useState({ postcode: "", value: "", email: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    const payload = {
      Postcode: form.postcode,
      EstimatedValue: parseInt(form.value),
      Email: form.email,
      Confidence: 0.95,
    };
    const res = await logValuation(payload);
    setStatus(res.id ? "✅ Log saved!" : "❌ Error saving log.");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 p-4 border rounded">
      <input name="postcode" placeholder="Postcode" value={form.postcode} onChange={handleChange} className="w-full p-2 border" required />
      <input name="value" placeholder="Estimated Value" value={form.value} onChange={handleChange} type="number" className="w-full p-2 border" required />
      <input name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} type="email" className="w-full p-2 border" />
      <button className="bg-black text-white px-4 py-2 rounded">Submit Log</button>
      <p>{status}</p>
    </form>
  );
}
