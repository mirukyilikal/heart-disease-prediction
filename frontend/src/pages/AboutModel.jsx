
function AboutModel() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          About the Model
        </h2>
        <p className="mt-2 text-gray-600">
          Learn about the machine learning model behind HeartAI,
          its dataset, training process, and performance.
        </p>
      </div>

      {/* Project Overview */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800">
          1. Project Overview
        </h3>
        <p className="mt-2 text-gray-600 leading-relaxed">
          HeartAI is an experimental machine learning application
          designed to estimate the presence of heart disease based
          on selected patient health information. It combines
          machine learning with a web-based interface to provide
          prediction results and maintain assessment history.
        </p>
      </section>

      {/* Dataset */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800">
          2. Dataset
        </h3>
        <p className="mt-2 text-gray-600 leading-relaxed">
          The project uses the Cleveland Heart Disease dataset
          from the UCI Machine Learning Repository.
          The dataset contains 303 patient records and 13 input
          features, including age, sex, chest pain type, resting
          blood pressure, cholesterol, maximum heart rate,
          and other clinical measurements.
        </p>
      </section>

      {/* Model Training */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800">
          3. Model Training and Optimization
        </h3>
        <p className="mt-2 text-gray-600 leading-relaxed">
          EvalML was used for automated machine learning
          optimization. It evaluated different machine learning
          pipelines and selected Logistic Regression as the
          best-performing pipeline based on the training
          and validation process.
        </p>
      </section>

      {/* Evaluation */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800">
          4. Model Performance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Accuracy</p>
            <p className="text-2xl font-bold text-green-700">88.52%</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Precision</p>
            <p className="text-2xl font-bold text-gray-800">83.87%</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Recall</p>
            <p className="text-2xl font-bold text-gray-800">92.86%</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">F1 Score</p>
            <p className="text-2xl font-bold text-gray-800">88.14%</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">ROC-AUC</p>
            <p className="text-2xl font-bold text-gray-800">96.32%</p>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          5. Limitations and Responsible Use
        </h3>
        <p className="mt-2 text-gray-600 leading-relaxed">
          HeartAI is an experimental educational project.
          It has not been clinically validated and must not
          be used to diagnose heart disease, predict future
          heart attacks, or replace professional medical advice.
          Predictions may be inaccurate, particularly for
          patients whose characteristics differ from the
          training dataset.
        </p>
      </section>
    </div>
  );
}

export default AboutModel;
