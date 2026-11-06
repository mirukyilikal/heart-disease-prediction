# Heart Disease Prediction — Model Evaluation Report

## 1. Best Model

- **Model:** EvalML Logistic Regression
- **Optimization:** Automated Machine Learning (EvalML)
- **Dataset:** UCI Cleveland Heart Disease Dataset
- **Training samples:** 242
- **Testing samples:** 61

## 2. Model Performance Metrics

| Metric | Score |
|---|---:|
| Accuracy | 88.52% |
| Precision | 83.87% |
| Recall | 92.86% |
| F1-Score | 88.14% |
| ROC-AUC | 96.32% |
| Average Precision | 95.79% |

## 3. Confusion Matrix

The confusion matrix is:

| | Predicted: No Disease | Predicted: Disease |
|---|---:|---:|
| Actual: No Disease | 28 | 5 |
| Actual: Disease | 2 | 26 |

- **True Negatives (28):** Correctly predicted no heart disease.
- **False Positives (5):** Predicted heart disease when the actual label was no disease.
- **False Negatives (2):** Failed to identify heart disease in two test cases.
- **True Positives (26):** Correctly identified heart disease.

## 4. Visualization Results

The following evaluation plots were generated:

- `confusion_matrix.png`
- `roc_curve.png`
- `precision_recall_curve.png`

## 5. Interpretation

The model achieved 88.52% accuracy on the test dataset.

Its recall of 92.86% means it identified approximately 93% of the positive heart disease cases in the test set.

The ROC-AUC score of 96.32% indicates strong ability to distinguish between the two classes across different classification thresholds.

The Average Precision score of 95.79% also indicates strong precision-recall performance.

## 6. Limitations

- The test set contains only 61 samples.
- The dataset is relatively small and may not represent the wider population.
- Performance on this dataset does not guarantee performance on new patients.
- The model is an experimental prediction system, not a medical diagnostic tool.
- Clinical validation with larger and more diverse datasets would be necessary before real-world medical use.

## 7. Conclusion

EvalML selected Logistic Regression as the best-performing pipeline during automated model optimization.

The selected model achieved promising evaluation results on the held-out test set. The next development stage will focus on model explainability to understand how individual input features influence predictions.