import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [formData, setFormData] = useState({
    postcode: '',
    bedrooms: '',
    heating_type: '',
    epc_rating: '',
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPredictedPrice(null);
    setError(null);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer trueval-secret-2025',
          },
        }
      );
      setPredictedPrice(response.data.predicted_price);
    } catch (err) {
      console.error(err);
      setError('Prediction failed. Please check your input or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">TrueVal Property Valuation</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="postcode"
          placeholder="Postcode"
          value={formData.postcode}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="heating_type"
          placeholder="Heating Type (e.g., gas)"
          value={formData.heating_type}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="epc_rating"
          placeholder="EPC Rating (e.g., C)"
          value={formData.epc_rating}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Get Valuation'}
        </button>
      </form>

      {predictedPrice && (
        <div className="mt-4 text-green-600 font-bold">
          Estimated Value: £{predictedPrice.toLocaleString()}
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}