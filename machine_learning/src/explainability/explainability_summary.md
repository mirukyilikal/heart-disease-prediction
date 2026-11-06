# Model Explainability Summary

## Explainability Method

SHAP (SHapley Additive exPlanations) was used to interpret the predictions made by the selected EvalML Logistic Regression model.

The SHAP LinearExplainer was applied to the trained model using transformed training data as background data and the test dataset for explanations.

## Global Feature Importance

The five most influential features identified by the SHAP global feature importance plot were:

1. ca
2. thal
3. cp
4. thal_7.0
5. oldpeak

## Interpretation

The results indicate that the model relies strongly on blood vessel information, thalassemia-related categories, chest pain type, and exercise-related ST depression when estimating the presence of heart disease.

The beeswarm plot provides additional information about how individual feature values influence model predictions.

## Limitations

- SHAP explains the behavior of the trained model; it does not establish medical causation.
- One-hot encoded features represent individual categories of original categorical variables.
- The model is experimental and has not been clinically validated.
- Predictions should not be used as a substitute for professional medical assessment.

## Conclusion

SHAP explainability provides insight into the features influencing the model's predictions and improves the interpretability of the Heart Disease Prediction project.
