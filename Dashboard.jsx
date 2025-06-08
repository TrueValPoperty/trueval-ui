import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const valuationData = [
  { date: 'Mon', valuations: 20 },
  { date: 'Tue', valuations: 35 },
  { date: 'Wed', valuations: 40 },
  { date: 'Thu', valuations: 30 },
  { date: 'Fri', valuations: 50 },
  { date: 'Sat', valuations: 25 },
  { date: 'Sun', valuations: 15 },
];

const confidenceData = [
  { level: 'High', count: 70 },
  { level: 'Medium', count: 20 },
  { level: 'Low', count: 10 },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Valuations This Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={valuationData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valuations" stroke="#0077cc" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Confidence Level Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0077cc" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
