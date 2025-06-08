import { useEffect, useState } from 'react';
import './index.css';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE + '/predict')
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-xl font-bold mb-4">TrueVal Valuation</h1>
      {loading ? <p>Loading...</p> :
       error ? <p className="text-red-600">Error: {error.message}</p> :
       <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
