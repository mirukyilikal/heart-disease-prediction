import pandas as pd
from typing import List
from sqlalchemy import func
from backend.app.schemas.prediction import PredictionHistoryResponse

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from backend.app.schemas.prediction import (
    PatientData,
    PredictionResponse,
    PredictionHistoryResponse,
    PredictionStatsResponse
)

from backend.app.services.model_service import (
    predict_heart_disease
)

from backend.app.database.connection import get_db

from backend.app.models.prediction import PredictionHistory


router = APIRouter(
    prefix="/api/v1/predictions",
    tags=["Heart Disease Prediction"]
)


@router.post("/", response_model=PredictionResponse)
def predict(
    patient: PatientData,
    db: Session = Depends(get_db)
):
    try:
        patient_df = pd.DataFrame([patient.model_dump()])

        
        result = predict_heart_disease(patient_df)

        if result["prediction"] == 1:
            message = "Model estimates presence of heart disease."
        else:
            message = "Model estimates absence of heart disease."

        new_prediction = PredictionHistory(
            **patient.model_dump(),
            prediction=result["prediction"],
            probability=result["probability"]
        )

        db.add(new_prediction)
        db.commit()
        db.refresh(new_prediction)
        return PredictionResponse(
            prediction=result["prediction"],
            probability=result["probability"],
            message=message
        )

    except Exception as error:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(error)}"
        )
@router.get("/history", response_model=List[PredictionHistoryResponse])
def get_prediction_history(db: Session = Depends(get_db)):
    try:
        history=(
            db.query(PredictionHistory)
            .order_by(PredictionHistory.created_at.desc())
            .all()
        )
        return history
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve prediction history:(str{error})"
        )
@router.get("/statistics", response_model=PredictionStatsResponse)
def get_prediction_statistics(db: Session = Depends(get_db)):
    try:
        total = db.query(PredictionHistory).count()

        positive = db.query(PredictionHistory).filter(
            PredictionHistory.prediction == 1
        ).count()

        negative = db.query(PredictionHistory).filter(
            PredictionHistory.prediction == 0
        ).count()

        average_probability = db.query(
            func.avg(PredictionHistory.probability)
        ).scalar()

        return PredictionStatsResponse(
            total_predictions=total,
            positive_predictions=positive,
            negative_predictions=negative,
            average_probability=float(average_probability or 0.0)
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve prediction statistics: {str(error)}"
        )
        