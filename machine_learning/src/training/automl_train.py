import json
import joblib
import pandas as pd
from evalml.automl import AutoMLSearch
from evalml.utils import infer_feature_types
from pathlib import Path
from sklearn.metrics import(
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    classification_report,
    confusion_matrix
)
PROJECT_ROOT=Path(__file__).resolve().parents[3]
PROCESSED_DATA_DIR=PROJECT_ROOT/"machine_learning"/"data"/"processed"

X_TRAIN_PATH=PROCESSED_DATA_DIR/"x_train.csv"
Y_TRAIN_PATH=PROCESSED_DATA_DIR/"y_train.csv"
X_TEST_PATH=PROCESSED_DATA_DIR/"x_test.csv"
Y_TEST_PATH=PROCESSED_DATA_DIR/"y_test.csv"
if __name__=="__main__":
    X_train=pd.read_csv(X_TRAIN_PATH)
    y_train=pd.read_csv(Y_TRAIN_PATH)
    X_test=pd.read_csv(X_TEST_PATH)
    y_test=pd.read_csv(Y_TEST_PATH)
    
    y_train=y_train.squeeze()
    y_test=y_test.squeeze()
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
    X_test=infer_feature_types(
        X_test,
        feature_types=feature_types
        
    )
    automl=AutoMLSearch(
        X_train=X_train,
        y_train=y_train,
        problem_type="binary",
        objective="F1",
        max_iterations=20,
        optimize_thresholds=True,
        random_seed=42
    )
    automl.search()
    best_pipeline=automl.best_pipeline
    best_pipeline_id=automl.rankings.iloc[0]["id"]
    best_pipeline=automl.get_pipeline(best_pipeline_id)
    best_pipeline.fit(X_train,y_train)
    MODEL_DIR=PROJECT_ROOT/"machine_learning"/"models"
    MODEL_DIR.mkdir(parents=True,exist_ok=True)
    model_path=MODEL_DIR/"best_pipeline.joblib"
    joblib.dump(best_pipeline,model_path)
    print(f"trained model saved to:{model_path}")
    
    y_pred=best_pipeline.predict(X_test)
    y_pred_proba=best_pipeline.predict_proba(X_test)
    print("probability output type:",type(y_pred_proba))
    print("probability output shape:",y_pred_proba.shape)
    print(y_pred_proba.head())
    if isinstance(y_pred_proba, pd.DataFrame):
         positive_probabilities = y_pred_proba.iloc[:, 1]
    else:
        positive_probabilities = y_pred_proba
    prediction_results=pd.DataFrame({
        "actual":y_test,
        "predicted_probability":positive_probabilities
        
    })
    predictions_path=(
        PROJECT_ROOT/"machine_learning"/"results"/"test_predictions.csv"
        
    )
    predictions_path.parent.mkdir(parents=True, exist_ok=True)

    prediction_results.to_csv(predictions_path, index=False)

    print(f"Test predictions saved to: {predictions_path}")
    accuracy=accuracy_score(y_test,y_pred)
    precision=precision_score(y_test,y_pred)
    recall=recall_score(y_test,y_pred)
    f1=f1_score(y_test,y_pred)
    roc_auc=roc_auc_score(y_test,positive_probabilities)
    cm=confusion_matrix(y_test,y_pred)
    print(cm)
    print(classification_report(y_test,y_pred))
    RESULTS_DIR=PROJECT_ROOT/"machine_learning"/"results"
    RESULTS_DIR.mkdir(parents=True,exist_ok=True)
    evaluation_results={
        "model":"Evalml Logistic Regression",
        "accuracy":accuracy,
        "precision":precision,
        "recall":recall,
        "f1":f1,
        "roc_auc":roc_auc,
        "true_negative":int(cm[0,0]),
        "false_positive":int(cm[0,1]),
        "false_negative":int(cm[1,0]),
        "true_positive":int(cm[1,1])

    }
    results_path=RESULTS_DIR/"evaluation_results.json"
    with open(results_path,"w") as file:
        json.dump(evaluation_results,file,indent=4)
    print(f"\nEvaluation results saved to: {results_path}")
        

    