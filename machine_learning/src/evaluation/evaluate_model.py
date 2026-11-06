import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
from sklearn.metrics import (
   roc_curve,
   auc,
   precision_recall_curve,
   average_precision_score
   )
PROJECT_ROOT=Path(__file__).resolve().parents[3]
RESULTS_DIR=PROJECT_ROOT /"machine_learning"/"results"
results_path=RESULTS_DIR/"evaluation_results.json"
with open(results_path,"r") as file:
    results=json.load(file)
cm=np.array([
    [results["true_negative"],results["false_positive"]],
    [results["false_negative"],results["true_positive"]]
])
plt.figure(figsize=(7,5))
sns.heatmap(
    cm,
    annot=True,
    
    fmt="d",
    cmap="Blues",
    xticklabels=["No Heart Disease","Heart Disease"],
    yticklabels=["No Heart Disease","Heart Disease"]
    
)
plt.title("Heart Disease Prediction -Confusion Matrix")
plt.xlabel("predicted label")
plt.ylabel("actual label")
plt.tight_layout()
plot_path=RESULTS_DIR/"confusion_matrix.png"
plt.savefig(plot_path,dpi=300)
plt.show()
print(f"Confusion matrix saved to: {plot_path}")


predictions_path=RESULTS_DIR/"test_predictions.csv"
predictions=pd.read_csv(predictions_path)
y_true=predictions["actual"]
y_scores=predictions["predicted_probability"]
print(predictions.head())
fpr,tpr,thresholds=roc_curve(y_true,y_scores)
roc_auc_value=auc(fpr,tpr)
print(roc_auc_value)
precision_values,recall_value,pr_thresholds=precision_recall_curve(
    y_true,
    y_scores
)
average_precision=average_precision_score(y_true,y_scores)
print(average_precision)
plt.figure(figsize=(7,5))
plt.plot(
    recall_value,
    precision_values,
    label=f"Precision-Recall Curve (AP={average_precision:.4f})",
    linewidth=2
)
plt.title("Precision-Recall Curve - Heart Disease Prediction")
plt.xlabel("Recall")
plt.ylabel("precision")
plt.grid(alpha=0.3)
plt.tight_layout()
pr_path = RESULTS_DIR / "precision_recall_curve.png"
plt.savefig(pr_path, dpi=300)

plt.show()

print(f"Precision-Recall curve saved to: {pr_path}")
plt.figure(figsize=(7,5))
plt.plot(
    fpr,
    tpr,
    label=f"ROC Curve(AUC={roc_auc_value:.4f})",
    linewidth=2
)
plt.plot(
    [0,1],
    [0,1],
    linestyle="--",
    label="Random classifier"
)
plt.title("ROC Curve -Heart Disease Prediction")
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.legend(loc="lower right")
plt.grid(alpha=0.3)

plt.tight_layout()
roc_path = RESULTS_DIR / "roc_curve.png"
plt.savefig(roc_path, dpi=300)

plt.show()

print(f"ROC curve saved to: {roc_path}")