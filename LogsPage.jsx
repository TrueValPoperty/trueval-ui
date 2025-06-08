import { useEffect, useState } from "react";
import { fetchLogs, logValuation } from "../lib/api";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({ postcode: "", value: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logValuation({
      Postcode: form.postcode,
      EstimatedValue: parseInt(form.value),
      Email: form.email,
      Confidence: 0.95
    });
    loadLogs();
  };

  const loadLogs = async () => {
    const data = await fetchLogs();
    setLogs(data);
  };

  useEffect(() => { loadLogs(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Valuation Logs</h1>
      <form onSubmit={handleSubmit} className="space-x-2 mb-6">
        <input name="postcode" value={form.postcode} onChange={(e) => setForm({ ...form, postcode: e.target.value })} placeholder="Postcode" />
        <input name="value" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="Estimated Value" />
        <input name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <button className="bg-blue-500 text-white px-4 py-1 rounded">Submit</button>
      </form>
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr><th>Postcode</th><th>Value</th><th>Email</th></tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} className="border-t">
              <td>{log.fields.Postcode}</td>
              <td>{log.fields.EstimatedValue}</td>
              <td>{log.fields.Email || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}