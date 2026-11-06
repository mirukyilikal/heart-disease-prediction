import Analytics from "./pages/Analytics";
import AboutModel from "./pages/AboutModel";
import History from "./pages/History";
import {useCallback,useEffect,useState} from "react";
import {getPredictionStatistics} from "./services/predictionService";
import Assessment from "./pages/Assessment";
function App() {
  const [statistics, setStatistics] = useState({
  total_predictions: 0,
  positive_predictions: 0,
  negative_predictions: 0,
  average_probability: 0,
});

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const fetchStatistics = useCallback(async () => {
  try {
    const data = await getPredictionStatistics();
    setStatistics(data);
    setError("");
  } catch (err) {
    console.error("Failed to fetch statistics:", err);
    setError("Unable to load prediction statistics.");
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  fetchStatistics();
}, [fetchStatistics]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
    <header className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
    <h1 className="text-2xl font-bold text-green-700">
      HeartAI
    </h1>

 <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-600">
  <a href="#home" className="hover:text-green-700">Home</a>
  <a href="#assessment" className="hover:text-green-700">Assessment</a>
  <a href="#history" className="hover:text-green-700">History</a>
  <a href="#about-model" className="hover:text-green-700">About Model</a>
</nav>
  </div>
</header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section id="home" className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Heart Disease Prediction Dashboard
          </h2>

          <p className="mt-3 text-gray-600">
            An experimental machine learning system for estimating
            the presence of heart disease.
          </p>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Total Predictions</p>
            <h3 className="text-3xl font-bold mt-3">
           {loading ? "..." : statistics.total_predictions}
          </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Positive Predictions</p>
            <h3 className="text-3xl font-bold mt-3">
  {loading ? "..." : statistics.positive_predictions}
</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Negative Predictions</p>
            <h3 className="text-3xl font-bold mt-3">
  {loading ? "..." : statistics.negative_predictions}
</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Model Accuracy</p>
            <h3 className="text-3xl font-bold mt-3">88.52%</h3>
          </div>
        </section>
        {error && (
  <p className="mt-4 text-red-600">
    {error}
  </p>
)}

        {/* Welcome Section */}
        <section className="mt-8 sm:mt-10 bg-white p-5 sm:p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800">
            Welcome to HeartAI
          </h3>

          <p className="mt-3 text-gray-600">
            Use the patient assessment tool to enter patient
            information and receive an experimental model estimate.
          </p>

          <button className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800">
            Start Assessment
          </button>
                </section>

        {/* Patient Assessment */}
        <section id="assessment" className="mt-10">
          <Assessment onPredictionSuccess={fetchStatistics}/>
        </section>
        <section id="history" className="mt-10">
          <History/>
        </section>
        <section id="about-model" className="mt-10">
          <AboutModel/>
        </section>
        <section id="analytics" className="mt-10">
          <Analytics/>
        </section>

      </main>
    </div>
  );
}

export default App;
