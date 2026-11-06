from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from backend.app.api.prediction import router as prediction_router
from backend.app.database.connection import engine, Base
from backend.app.models.prediction import PredictionHistory
app=FastAPI(
    title="heart disease prediction API",
    description="An experimental API for estimating the presence of heart disease using machine learning.",
    version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(prediction_router)
@app.get("/")
def home():

    return{
        "message": "Heart Disease Prediction API is running!",
        "status": "success"
        
    }
@app.get("/health")
def health_check():
    return{
        "status":"healthy"
    }
