export default function Dashboard() {
  const stats = [
    { label: "Total Valuations", value: "258" },
    { label: "Avg. Confidence", value: "High" },
    { label: "This Week", value: "62" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white shadow rounded p-4">
            <h2 className="text-sm text-gray-600">{stat.label}</h2>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
