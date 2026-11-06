import joblib
from pathlib import Path 
from evalml.utils import infer_feature_types 
PROJECT_ROOT=Path(__file__).resolve().parents[3]
MODEL_PATH=(
    PROJECT_ROOT
    /"machine_learning"
    /"models"
    /"best_pipeline.joblib"
)
def load_model():
    """
    Load the trained heart disease prediction model.
    """
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Trained model not found at:{MODEL_PATH}"
            
        )
    return joblib.load(MODEL_PATH)
model=load_model()
def predict_heart_disease(patient_data):
    """
    Predict heart disease using patient information."""
    feature_types={
        "sex":"categorical",
        "cp": "categorical",
        "fbs": "categorical",
        "restecg": "categorical",
        "exang": "categorical",
        "slope": "categorical",
        "thal": "categorical",
        "ca": "integer",
        
    }
    patient_data=infer_feature_types(
        patient_data,
        feature_types=feature_types
    )
    prediction=model.predict(patient_data)
    probabilities=model.predict_proba(patient_data)
    return{
        "prediction":int(prediction.iloc[0]),
        "probability":float(probabilities.iloc[0,1])
    }
