import { useEffect, useState } from "react";
import { fetchLogs } from "../lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLogs().then(logs => {
      const transformed = logs.map(log => ({
        name: log.fields.Postcode,
        value: log.fields.EstimatedValue
      }));
      setData(transformed);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Analytics</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}