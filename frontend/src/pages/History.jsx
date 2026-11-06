
import { useEffect, useState } from "react";
import { getPredictionHistory } from "../services/predictionService";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getPredictionHistory();
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setError("Unable to load prediction history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Prediction History
        </h2>
        <p className="mt-2 text-gray-600">
          View previously submitted patient assessments and their prediction results.
        </p>
      </div>

      {loading && (
        <p className="text-gray-500">Loading prediction history...</p>
      )}

      {error && (
        <p className="text-red-600">{error}</p>
      )}

      {!loading && !error && history.length === 0 && (
        <p className="text-gray-500">No prediction records found.</p>
      )}

      {!loading && !error && history.length > 0 && (
        <>
          <p className="mb-4 text-sm text-gray-600">
            Total records: <span className="font-semibold">{history.length}</span>
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Sex</th>
                  <th className="px-4 py-3">Chest Pain</th>
                  <th className="px-4 py-3">BP</th>
                  <th className="px-4 py-3">Cholesterol</th>
                  <th className="px-4 py-3">Max HR</th>
                  <th className="px-4 py-3">Result</th>
                  <th className="px-4 py-3">Probability</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {history.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{record.id}</td>
                    <td className="px-4 py-3">{record.age}</td>
                    <td className="px-4 py-3">
                      {record.sex === 1 ? "Male" : "Female"}
                    </td>
                    <td className="px-4 py-3">{record.cp}</td>
                    <td className="px-4 py-3">{record.trestbps}</td>
                    <td className="px-4 py-3">{record.chol}</td>
                    <td className="px-4 py-3">{record.thalach}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          record.prediction === 1
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {record.prediction === 1
                          ? "Heart disease estimated"
                          : "No heart disease estimated"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {(record.probability * 100).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(record.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default History;
