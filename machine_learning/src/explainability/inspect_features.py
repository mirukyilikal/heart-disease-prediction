import joblib
import pandas as pd
from pathlib import Path
from evalml.utils import infer_feature_types
PROJECT_ROOT=Path(__file__).resolve().parents[3]
MODEL_PATH=(
    PROJECT_ROOT
    /"machine_learning"
    /"models"
    /"best_pipeline.joblib"
)
X_TRAIN_PATH=(
    PROJECT_ROOT
    /"machine_learning"
    /"data"
    /"processed"
    /"x_train.csv"
)
pipeline=joblib.load(MODEL_PATH)
X_train=pd.read_csv(X_TRAIN_PATH)
feature_types={
    "sex":"categorical",
    "cp":"categorical",
    "fbs":"categorical",
    "restecg":"categorical",
    "exang":"categorical",
    "slope":"categorical",
    "thal":"categorical",
    "ca":"integer",
    
}
X_train=infer_feature_types(
    X_train,
    feature_types=feature_types
)

X_transformed=pipeline.component_graph.transform_all_but_final(
    X_train
)
print("original training shape:",X_train.shape)
print("transformed training shape:",X_transformed.shape)
print(X_transformed.columns.tolist())
print(X_transformed.head())
