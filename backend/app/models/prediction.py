from sqlalchemy import Column,Integer,Float,DateTime
from sqlalchemy.sql import func
from backend.app.database.connection import Base
class PredictionHistory(Base):
    __tablename__="prediction_history"
    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer, nullable=False)
    sex = Column(Integer, nullable=False)
    cp = Column(Integer, nullable=False)
    trestbps = Column(Float, nullable=False)
    chol = Column(Float, nullable=False)
    fbs = Column(Integer, nullable=False)
    restecg = Column(Integer, nullable=False)
    thalach = Column(Float, nullable=False)
    exang = Column(Integer, nullable=False)
    oldpeak = Column(Float, nullable=False)
    slope = Column(Integer, nullable=False)
    ca = Column(Integer, nullable=False)
    thal = Column(Integer, nullable=False)
    prediction=Column(Integer,nullable=False)
    probability=Column(Float,nullable=False)
    created_at=Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    
    