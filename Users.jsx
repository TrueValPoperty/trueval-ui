import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock Airtable-style API response
    const mockData = [
      { fields: { Name: "Jane Doe", Email: "jane@trueval.co.uk", Role: "Admin" }},
      { fields: { Name: "John Smith", Email: "john@trueval.co.uk", Role: "Editor" }},
    ];
    setTimeout(() => {
      setUsers(mockData);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border text-sm bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((entry, idx) => (
              <tr key={idx}>
                <td className="border px-3 py-1">{entry.fields.Name}</td>
                <td className="border px-3 py-1">{entry.fields.Email}</td>
                <td className="border px-3 py-1">{entry.fields.Role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
