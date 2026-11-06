from pydantic import BaseModel,Field
from datetime import datetime
class PatientData(BaseModel):
    """
    input data required for heart disease prediction.
    """
    age:int=Field(...,ge=1,le=120)
    sex:int=Field(...,ge=0,le=1)
    cp:int=Field(...,ge=1,le=4)
    trestbps:float=Field(...,ge=0)
    chol:float=Field(...,ge=0)
    fbs:int=Field(...,ge=0,le=1)
    restecg:int=Field(...,ge=0,le=2)
    thalach: float = Field(..., gt=0)
    exang: int = Field(..., ge=0, le=1)
    oldpeak: float = Field(..., ge=0)
    slope: int = Field(..., ge=1, le=3)
    ca: int = Field(..., ge=0, le=3)
    thal: int = Field(..., ge=3, le=7)
class PredictionResponse(BaseModel):
    """
    Response returned after heart disease prediction.
    """
    prediction:int=Field(...,ge=0,le=1)
    probability:float=Field(...,ge=0,le=1)
    message:str
class PredictionHistoryResponse(BaseModel):
    id: int
    age: int
    sex: int
    cp: int
    trestbps: float
    chol: float
    fbs: int
    restecg: int
    thalach: float
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int
    prediction: int
    probability: float
    created_at: datetime
    model_config={
        "from_attributes":True
    }
class PredictionStatsResponse(BaseModel):
    total_predictions: int
    positive_predictions: int
    negative_predictions: int
    average_probability: float
    


