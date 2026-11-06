import {useState} from "react";
import { createPrediction } from "../services/predictionService";
function Assessment({onPredictionSuccess}) {
    const [formData,setFormData]=useState({
        age:"",
        sex:"",
        cp:"",
        trestbps: "",
        chol: "",
        fbs: "",
        restecg: "",
        thalach: "",
        exang: "",
        oldpeak: "",
        slope: "",
        ca: "",
        thal: "",
});
const [predictionResult, setPredictionResult] = useState(null);
const [loading,setLoading]=useState(false);
const [error,setError]=useState("");
const handleChange=(event)=> {
    const {name,value}=event.target;
    setFormData((previousData) => ({
        ...previousData,
        [name]:value,


    }));
};
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    setLoading(true);
    setError("");
    setPredictionResult(null);
    const patientData = {
      age: Number(formData.age),
      sex: Number(formData.sex),
      cp: Number(formData.cp),
      trestbps: Number(formData.trestbps),
      chol: Number(formData.chol),
      fbs: Number(formData.fbs),
      restecg: Number(formData.restecg),
      thalach: Number(formData.thalach),
      exang: Number(formData.exang),
      oldpeak: Number(formData.oldpeak),
      slope: Number(formData.slope),
      ca: Number(formData.ca),
      thal: Number(formData.thal),
    };
    const result=await createPrediction(patientData);
    setPredictionResult(result);
    await onPredictionSuccess();
    console.log("prediction result:",result);
}  catch (error) {
  console.error("Prediction failed:", error);

  setError(
    error.response?.data?.detail ||
    "Something went wrong. Please try again."
  );
} finally {
  setLoading(false);
}
};
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Patient Assessment
          </h1>

          <p className="mt-2 text-gray-600">
            Enter patient information to receive an experimental
            heart disease model estimate.
          </p>
        </div>

        {/* Assessment Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-sm"
>

          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Patient Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
                placeholder="Enter age"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Sex */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sex
              </label>

              <select 
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
           >
              
                <option value="">Select sex</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>

            {/* Chest Pain Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chest Pain Type
              </label>

              <select 
               name="cp"
               value={formData.cp}
               onChange={handleChange}
               required
               className="w-full border border-gray-300 rounded-lg px-4 py-3"
               >
                <option value="">Select chest pain type</option>
                <option value="1">Typical angina</option>
                <option value="2">Atypical angina</option>
                <option value="3">Non-anginal pain</option>
                <option value="4">Asymptomatic</option>
              </select>
            </div>

            {/* Resting Blood Pressure */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resting Blood Pressure (mm Hg)
              </label>

              <input
                type="number"
                name="trestbps"
                value={formData.trestbps}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 120"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

{/* Fasting Blood Sugar */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Fasting Blood Sugar
  </label>

  <select
  name="fbs"
  value={formData.fbs}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 rounded-lg px-4 py-3">
    <option value="">Select an option</option>
    <option value="1">Greater than 120 mg/dl</option>
    <option value="0">120 mg/dl or less</option>
  </select>
</div>

{/* Resting ECG */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Resting ECG
  </label>

  <select 
     name="restecg"
      value={formData.restecg}
     onChange={handleChange}
     required
    className="w-full border border-gray-300 rounded-lg px-4 py-3"
  >
    <option value="">Select ECG result</option>
    <option value="0">Normal</option>
    <option value="1">ST-T wave abnormality</option>
    <option value="2">Left ventricular hypertrophy</option>
  </select>
</div>

{/* Maximum Heart Rate */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Maximum Heart Rate Achieved
  </label>

 <input
  type="number"
  name="thalach"
  value={formData.thalach}
  onChange={handleChange}
  min="1"
  placeholder="e.g. 150"
  required
  className="w-full border border-gray-300 rounded-lg px-4 py-3"
/>
</div>

{/* Cholesterol */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Serum Cholesterol (mg/dl)
  </label>

  <input
    type="number"
    name="chol"
    value={formData.chol}
    onChange={handleChange}
    min="0"
    placeholder="e.g. 200"
    required
    className="w-full border border-gray-300 rounded-lg px-4 py-3"
  />
</div>

{/* Exercise Induced Angina */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Exercise-Induced Angina
  </label>

  <select 
  name="exang"
  value={formData.exang}
   onChange={handleChange}
   required
  className="w-full border border-gray-300 rounded-lg px-4 py-3">
    <option value="">Select an option</option>
    <option value="1">Yes</option>
    <option value="0">No</option>
  </select>
</div>

{/* ST Depression */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    ST Depression (Oldpeak)
  </label>

  <input

    type="number"
    name="oldpeak"
    value={formData.oldpeak}
    onChange={handleChange}
    min="0"
    step="0.1"
    placeholder="e.g. 1.2"
    required
    className="w-full border border-gray-300 rounded-lg px-4 py-3"
  />
</div>

{/* Slope */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Slope of Peak Exercise ST Segment
  </label>

  <select 
  name="slope"
  value={formData.slope}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 rounded-lg px-4 py-3">
    <option value="">Select slope</option>
    <option value="1">Upsloping</option>
    <option value="2">Flat</option>
    <option value="3">Downsloping</option>
  </select>
</div>

{/* Number of Major Vessels */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Number of Major Vessels (CA)
  </label>

  <select 
  name="ca"
   value={formData.ca}
   onChange={handleChange}
   required
   className="w-full border border-gray-300 rounded-lg px-4 py-3">
    <option value="">Select number</option>
    <option value="0">0</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
</div>

{/* Thalassemia */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Thalassemia (Thal)
  </label>

  <select 
  name="thal"
   value={formData.thal}
   onChange={handleChange}
   required
   className="w-full border border-gray-300 rounded-lg px-4 py-3">
    <option value="">Select result</option>
    <option value="3">Normal</option>
    <option value="6">Fixed defect</option>
    <option value="7">Reversible defect</option>
  </select>
</div>

          </div>
          {/* Submit Button */}
<div className="mt-8 flex justify-end">
  <button
    type="submit"
    disabled={loading}
    className="w-full sm:w-auto bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
  >
    {loading ? "Generating Prediction..." : "Generate Prediction"}
  </button>
</div>
        </form>
        {error && (
  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-700 font-medium">
      {error}
    </p>
  </div>
)}
        {predictionResult && (
  <div className="mt-8 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">

    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Prediction Result
    </h2>

    <div className={`p-5 rounded-lg ${
      predictionResult.prediction === 1
        ? "bg-red-50 border border-red-200"
        : "bg-green-50 border border-green-200"
    }`}>

      <h3 className={`text-xl font-bold ${
        predictionResult.prediction === 1
          ? "text-red-700"
          : "text-green-700"
      }`}>
        {predictionResult.prediction === 1
          ? "Estimated Presence of Heart Disease"
          : "Estimated Absence of Heart Disease"}
      </h3>

      <p className="mt-3 text-gray-700">
        {predictionResult.message}
      </p>

      <p className="mt-4 text-gray-800">
        Model probability for presence of heart disease:
        <span className="font-bold ml-2">
          {(predictionResult.probability * 100).toFixed(2)}%
        </span>
      </p>

    </div>

    <p className="mt-5 text-sm text-gray-500">
      Important: This is an experimental machine learning estimate,
      not a medical diagnosis. It should not replace professional
      medical evaluation.
    </p>

  </div>
)}
      </div>
    </div>
  );
}

export default Assessment;
