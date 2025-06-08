import { useEffect, useState } from 'react';
import { fetchValuationLogs } from '../api/airtable';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

function groupByDate(records) {
  const result = {};
  records.forEach(rec => {
    const date = new Date(rec.fields["Valuation Date"]).toLocaleDateString();
    result[date] = (result[date] || 0) + 1;
  });
  return Object.entries(result).map(([date, count]) => ({ date, valuations: count }));
}

function groupByConfidence(records) {
  const result = {};
  records.forEach(rec => {
    const score = rec.fields["Confidence"];
    if (score != null) {
      const bucket = score >= 80 ? "High" : score >= 50 ? "Medium" : "Low";
      result[bucket] = (result[bucket] || 0) + 1;
    }
  });
  return Object.entries(result).map(([level, count]) => ({ level, count }));
}

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchValuationLogs()
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  const lineData = groupByDate(logs);
  const barData = groupByConfidence(logs);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Live Analytics Dashboard</h1>
      {loading ? (
        <p>Loading Airtable data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Valuations Per Day</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="valuations" stroke="#0077cc" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Confidence Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0077cc" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
