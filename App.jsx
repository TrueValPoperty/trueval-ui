
import { useState } from "react";
import "./index.css";

function App() {
  const [formData, setFormData] = useState({
    postcode: "",
    bedrooms: 1,
    heating_type: "gas",
    epc_rating: "C",
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictedPrice(null);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer trueval-secret-2025",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setPredictedPrice(data.predicted_price);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to fetch prediction.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-4">
      <div className="bg-gray-100 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">TrueVal Valuation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            placeholder="Postcode"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            min="1"
            placeholder="Bedrooms"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="heating_type"
            value={formData.heating_type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="gas">Gas</option>
            <option value="electric">Electric</option>
            <option value="oil">Oil</option>
          </select>
          <select
            name="epc_rating"
            value={formData.epc_rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Get Valuation
          </button>
        </form>

        {predictedPrice && (
          <div className="mt-4 text-center font-semibold text-green-700">
            Estimated Price: £{predictedPrice.toLocaleString()}
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-red-600">{error}</div>
        )}
      </div>
    </div>
  );
}

export default App;
