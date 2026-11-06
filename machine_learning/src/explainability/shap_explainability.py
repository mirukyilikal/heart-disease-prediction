import joblib
import pandas as pd
import shap
import matplotlib.pyplot as plt
from pathlib import Path
from evalml.utils import infer_feature_types
PROJECT_ROOT=Path(__file__).resolve().parents[3]
MODEL_PATH=PROJECT_ROOT/"machine_learning"/"models"/"best_pipeline.joblib"

X_TRAIN_PATH=PROJECT_ROOT/"machine_learning"/"data"/"processed"/"x_train.csv"
X_TEST_PATH=PROJECT_ROOT/"machine_learning"/"data"/"processed"/"x_test.csv"
RESULTS_DIR=PROJECT_ROOT/"machine_learning"/"results"
RESULTS_DIR.mkdir(parents=True,exist_ok=True)
pipeline=joblib.load(MODEL_PATH)
estimator_wrapper=pipeline.component_graph.get_estimators()[0]
sklearn_model=estimator_wrapper._component_obj
print("model loaded:",type(sklearn_model))

X_train=pd.read_csv(X_TRAIN_PATH)
X_test=pd.read_csv(X_TEST_PATH)
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
x_train=infer_feature_types(X_train,feature_types=feature_types)
x_test=infer_feature_types(X_test,feature_types=feature_types)

X_train_transformed =pipeline.component_graph.transform_all_but_final(x_train)
X_test_transformed =pipeline.component_graph.transform_all_but_final(x_test)

X_train_transformed=X_train_transformed.astype(float)
X_test_transformed=X_test_transformed.astype(float)


print("training data shape:",X_train_transformed.shape)
print("testing data shape:",X_test_transformed.shape)

background_data=X_train_transformed.sample(
    n=min(100,len(X_train_transformed)),
    random_state=42
)
explainer=shap.LinearExplainer(
    sklearn_model,
    background_data
)
shap_values=explainer(X_test_transformed)
plt.figure()
shap.plots.bar(shap_values,show=False)
plt.title("SHAP Global feature importance")
plt.tight_layout()
bar_path=RESULTS_DIR/"shap_summary_bar.png"
plt.savefig(bar_path,dpi=300,bbox_inches="tight")
plt.close()

print("creating shap summary plot...")
plt.figure()
shap.plots.beeswarm(shap_values,show=False)
plt.title("shape feature impact summary")
plt.tight_layout()
beeswarm_path=RESULTS_DIR/"shap_beeswarm.png"
plt.savefig(beeswarm_path,dpi=300,bbox_inches="tight")
plt.close()
print(bar_path)
print(beeswarm_path)