
import { useEffect, useState } from "react";
import {
  getPredictionStatistics,
  getPredictionHistory,
} from "../services/predictionService";

function Analytics() {
  const [statistics, setStatistics] = useState({
    total_predictions: 0,
    positive_predictions: 0,
    negative_predictions: 0,
    average_probability: 0,
  });

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [statsData, historyData] = await Promise.all([
          getPredictionStatistics(),
          getPredictionHistory(),
        ]);

        setStatistics(statsData);
        setHistory(historyData);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
        setError("Unable to load prediction analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const total = statistics.total_predictions;

  const positivePercentage =
    total > 0
      ? (statistics.positive_predictions / total) * 100
      : 0;

  const negativePercentage =
    total > 0
      ? (statistics.negative_predictions / total) * 100
      : 0;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800">
        Prediction Analytics
      </h2>

      <p className="mt-2 text-gray-600">
        Visual analysis of saved heart disease prediction results.
      </p>

      {loading && (
        <p className="mt-6 text-gray-500">
          Loading analytics...
        </p>
      )}

      {error && (
        <p className="mt-6 text-red-600">{error}</p>
      )}

      {!loading && !error && (
        <>
          {/* Prediction Distribution */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              1. Prediction Distribution
            </h3>

            <p className="text-gray-600 mb-5">
              Total assessments: <strong>{total}</strong>
            </p>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">
                  Positive Predictions
                </span>
                <span className="font-semibold text-red-600">
                  {statistics.positive_predictions} ({positivePercentage.toFixed(1)}%)
                </span>
              </div>

              <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${positivePercentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">
                  Negative Predictions
                </span>
                <span className="font-semibold text-green-700">
                  {statistics.negative_predictions} ({negativePercentage.toFixed(1)}%)
                </span>
              </div>

              <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{ width: `${negativePercentage}%` }}
                />
              </div>
            </div>
          </section>

          {/* Prediction Probability */}
          <section className="mt-10 border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              2. Individual Prediction Probabilities
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Estimated probability of heart disease for each saved assessment.
            </p>

            <div className="space-y-5">
              {history.map((record) => {
                const probability = record.probability * 100;

                return (
                  <div key={record.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Assessment #{record.id} (Age {record.age})
                      </span>

                      <span className="text-sm font-semibold text-gray-800">
                        {probability.toFixed(2)}%
                      </span>
                    </div>

                    <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          record.prediction === 1
                            ? "bg-red-500"
                            : "bg-green-600"
                        }`}
                        style={{ width: `${probability}%` }}
                      />
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      {record.prediction === 1
                        ? "Heart disease estimated"
                        : "No heart disease estimated"}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Analytics;
