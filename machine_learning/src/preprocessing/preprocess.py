import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer



cols = [
    'age', 'sex', 'cp', 'trestbps', 'chol',
    'fbs', 'restecg', 'thalach', 'exang',
    'oldpeak', 'slope', 'ca', 'thal', 'target'
]

df = pd.read_csv(
    'machine_learning/data/raw/processed.cleveland.data',
    names=cols,
    na_values='?'
)

df['target'] = (df['target'] > 0).astype(int)
categorical_columns=[
    'sex',
    'cp',
    'fbs',
    'restecg',
    'exang',
    'slope',
    'thal'
]

numerical_columns = [
    'age',
    'trestbps',
    'chol',
    'thalach',
    'oldpeak',
    'ca'
]

print("categorical features:",categorical_columns)
print("number of categorical features:",len(categorical_columns))
print("\nNumerical features:",numerical_columns)
print("Number of numerical features:",len(numerical_columns))
print("\nTotal features:",
      len(categorical_columns)+len(numerical_columns)
      )
print("============================================")

X = df.drop('target', axis=1)
y = df['target']


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

imputer = SimpleImputer(strategy='most_frequent')
X_train = pd.DataFrame(
    imputer.fit_transform(X_train),
    columns=X.columns,
    index=X_train.index
)
X_test = pd.DataFrame(
    imputer.transform(X_test),
    columns=X.columns,
    index=X_test.index
)

outlier_columns=[
    'age',
    'trestbps',
    'chol',
    'thalach',
    'oldpeak'
]

for column in outlier_columns:

    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)

    IQR = Q3 - Q1

    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    outliers = df.loc[
        (df[column] < lower_bound) |
        (df[column] > upper_bound),
        column
    ]

    print(f"\nFeature: {column}")
    print("Outlier values:", outliers.tolist())
    print(f"Lower bound: {lower_bound:.2f}")
    print(f"Upper bound: {upper_bound:.2f}")
    print("Number of outliers:", len(outliers))

duplicate_count = df.duplicated().sum()

print(f"Dataset shape: {df.shape}")

print(f"Training dataset shape: {X_train.shape}")

print(f"Testing dataset shape: {X_test.shape}")

print(f"Duplicate records: {duplicate_count}")

print(
    "Missing values in training data:",
    X_train.isnull().sum().sum()
)

print(
    "Missing values in testing data:",
    X_test.isnull().sum().sum()
)
os.makedirs('machine_learning/data/processed', exist_ok=True)
os.makedirs('machine_learning/models',exist_ok=True)
X_train.to_csv(
    'machine_learning/data/processed/X_train.csv',
    index=False
)
X_test.to_csv(
    'machine_learning/data/processed/X_test.csv',
    index=False
)
y_train.to_frame(name='target').to_csv(
    'machine_learning/data/processed/y_train.csv',
    index=False
)
y_test.to_frame(name='target').to_csv(
    'machine_learning/data/processed/y_test.csv',
    index=False
)
joblib.dump(
    imputer,
    'machine_learning/models/imputer.joblib'
    
)
feature_definitions={
    'categorical_columns':categorical_columns,
    'numerical_columns':numerical_columns,
    'outlier_columns':outlier_columns
}

joblib.dump(
    feature_definitions,
    'machine_learning/models/feature_definitions.joblib'
)

