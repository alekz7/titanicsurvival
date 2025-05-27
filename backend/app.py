from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
import numpy as np
from typing import Optional, List, Dict, Any, Union
from enum import Enum
import os
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

# Initialize FastAPI app
app = FastAPI(title="Titanic Survival API")

# CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the Titanic dataset
# In a real app, this would load from a database or file storage
# For this example, we'll use a sample of the Titanic dataset
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "titanic.csv")

# Model file path
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "titanic_model.pkl")

# Create data directory if it doesn't exist
os.makedirs(os.path.join(os.path.dirname(__file__), "data"), exist_ok=True)
os.makedirs(os.path.join(os.path.dirname(__file__), "models"), exist_ok=True)

# Create a sample dataset if the file doesn't exist (for development purposes)
if not os.path.exists(DATA_PATH):
    # Create sample data
    data = {
        'PassengerId': list(range(1, 892)),
        'Survived': np.random.choice([0, 1], size=891, p=[0.6, 0.4]),
        'Pclass': np.random.choice([1, 2, 3], size=891, p=[0.2, 0.3, 0.5]),
        'Name': ['Passenger ' + str(i) for i in range(1, 892)],
        'Sex': np.random.choice(['male', 'female'], size=891),
        'Age': np.random.normal(30, 14, size=891),
        'SibSp': np.random.choice(range(9), size=891, p=[0.7, 0.15, 0.05, 0.05, 0.02, 0.01, 0.01, 0.005, 0.005]),
        'Parch': np.random.choice(range(7), size=891, p=[0.7, 0.15, 0.05, 0.05, 0.02, 0.02, 0.01]),
        'Ticket': ['Ticket ' + str(i) for i in range(1, 892)],
        'Fare': np.random.exponential(scale=30, size=891),
        'Cabin': [None if np.random.random() < 0.8 else 'C' + str(i) for i in range(1, 892)],
        'Embarked': np.random.choice(['S', 'C', 'Q', None], size=891, p=[0.7, 0.2, 0.09, 0.01]),
    }
    df = pd.DataFrame(data)
    
    # Make Age data more realistic
    # Set ~10% of ages to NaN
    null_indices = np.random.choice(df.index, size=int(len(df) * 0.1), replace=False)
    df.loc[null_indices, 'Age'] = np.nan
    
    # Round ages to nearest 0.5
    df['Age'] = df['Age'].apply(lambda x: None if pd.isna(x) else round(x * 2) / 2)
    
    # Adjust survival rates to be more realistic
    # Class effect
    df.loc[df['Pclass'] == 1, 'Survived'] = np.random.choice([0, 1], size=len(df[df['Pclass'] == 1]), p=[0.37, 0.63])
    df.loc[df['Pclass'] == 2, 'Survived'] = np.random.choice([0, 1], size=len(df[df['Pclass'] == 2]), p=[0.53, 0.47])
    df.loc[df['Pclass'] == 3, 'Survived'] = np.random.choice([0, 1], size=len(df[df['Pclass'] == 3]), p=[0.76, 0.24])
    
    # Gender effect
    df.loc[df['Sex'] == 'female', 'Survived'] = np.random.choice([0, 1], size=len(df[df['Sex'] == 'female']), p=[0.26, 0.74])
    df.loc[df['Sex'] == 'male', 'Survived'] = np.random.choice([0, 1], size=len(df[df['Sex'] == 'male']), p=[0.81, 0.19])
    
    # Age effect - children had higher survival rates
    df.loc[(df['Age'] < 10) & (~pd.isna(df['Age'])), 'Survived'] = np.random.choice([0, 1], size=len(df[(df['Age'] < 10) & (~pd.isna(df['Age']))]), p=[0.3, 0.7])
    
    # Save to CSV
    df.to_csv(DATA_PATH, index=False)

# Load the dataset
df = pd.read_csv(DATA_PATH)

# Train and save the model if it doesn't exist
if not os.path.exists(MODEL_PATH):
    # Prepare the data
    features = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked']
    X = df[features]
    y = df['Survived']
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Define preprocessing for numerical and categorical features
    numeric_features = ['Age', 'SibSp', 'Parch', 'Fare']
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    
    categorical_features = ['Pclass', 'Sex', 'Embarked']
    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    # Create the full pipeline with preprocessing and model
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
    ])
    
    # Train the model
    model.fit(X_train, y_train)
    
    # Save the model
    joblib.dump(model, MODEL_PATH)

# Load the trained model
model = joblib.load(MODEL_PATH)

# Pydantic models for request/response validation
class PredictionInput(BaseModel):
    pclass: int
    sex: str
    age: float
    sibsp: int
    parch: int
    fare: float
    embarked: str

class PredictionResult(BaseModel):
    survival: bool
    probability: float
    features: Dict[str, Any]

class Gender(str, Enum):
    male = "male"
    female = "female"

class Embarked(str, Enum):
    S = "S"
    C = "C"
    Q = "Q"

class PassengerFilters(BaseModel):
    survived: Optional[bool] = None
    pclass: Optional[int] = None
    sex: Optional[Gender] = None
    age_min: Optional[float] = None
    age_max: Optional[float] = None
    embarked: Optional[Embarked] = None

# API response format
def create_response(success: bool, data: Any = None, error: str = None):
    return {"success": success, "data": data, "error": error}

# API endpoints
@app.get("/api/passengers")
async def get_passengers(
    survived: Optional[bool] = None,
    pclass: Optional[int] = Query(None, ge=1, le=3),
    sex: Optional[str] = None,
    age_min: Optional[float] = Query(None, ge=0),
    age_max: Optional[float] = Query(None, le=100),
    embarked: Optional[str] = None
):
    """Get passenger data with optional filters."""
    try:
        filtered_df = df.copy()
        
        # Apply filters
        if survived is not None:
            filtered_df = filtered_df[filtered_df['Survived'] == int(survived)]
        
        if pclass is not None:
            filtered_df = filtered_df[filtered_df['Pclass'] == pclass]
        
        if sex is not None:
            filtered_df = filtered_df[filtered_df['Sex'] == sex]
        
        if age_min is not None:
            filtered_df = filtered_df[filtered_df['Age'] >= age_min]
        
        if age_max is not None:
            filtered_df = filtered_df[filtered_df['Age'] <= age_max]
        
        if embarked is not None:
            filtered_df = filtered_df[filtered_df['Embarked'] == embarked]
        
        # Convert to list of dictionaries
        passengers = []
        for _, row in filtered_df.iterrows():
            passengers.append({
                'id': int(row['PassengerId']),
                'survived': bool(row['Survived']),
                'pclass': int(row['Pclass']),
                'name': row['Name'],
                'sex': row['Sex'],
                'age': None if pd.isna(row['Age']) else float(row['Age']),
                'sibsp': int(row['SibSp']),
                'parch': int(row['Parch']),
                'ticket': row['Ticket'],
                'fare': float(row['Fare']),
                'cabin': row['Cabin'],
                'embarked': row['Embarked']
            })
        
        return create_response(True, passengers)
    
    except Exception as e:
        return create_response(False, error=str(e))

@app.get("/api/stats/class")
async def get_survival_by_class():
    """Get survival statistics by passenger class."""
    try:
        stats = []
        for pclass in [1, 2, 3]:
            class_df = df[df['Pclass'] == pclass]
            survived = class_df['Survived'].sum()
            total = len(class_df)
            died = total - survived
            survival_rate = round((survived / total) * 100, 2) if total > 0 else 0
            
            class_name = {1: 'First Class', 2: 'Second Class', 3: 'Third Class'}.get(pclass, f'Class {pclass}')
            
            stats.append({
                'class': class_name,
                'survived': int(survived),
                'died': int(died),
                'total': int(total),
                'survivalRate': survival_rate
            })
        
        return create_response(True, stats)
    
    except Exception as e:
        return create_response(False, error=str(e))

@app.get("/api/stats/gender")
async def get_survival_by_gender():
    """Get survival statistics by gender."""
    try:
        stats = []
        for sex in ['female', 'male']:
            gender_df = df[df['Sex'] == sex]
            survived = gender_df['Survived'].sum()
            total = len(gender_df)
            died = total - survived
            survival_rate = round((survived / total) * 100, 2) if total > 0 else 0
            
            gender_name = 'Female' if sex == 'female' else 'Male'
            
            stats.append({
                'gender': gender_name,
                'survived': int(survived),
                'died': int(died),
                'total': int(total),
                'survivalRate': survival_rate
            })
        
        return create_response(True, stats)
    
    except Exception as e:
        return create_response(False, error=str(e))

@app.get("/api/stats/age")
async def get_survival_by_age():
    """Get survival statistics by age group."""
    try:
        # Define age groups
        age_groups = [
            (0, 10, '0-10'),
            (11, 20, '11-20'),
            (21, 30, '21-30'),
            (31, 40, '31-40'),
            (41, 50, '41-50'),
            (51, 60, '51-60'),
            (61, 100, '61+')
        ]
        
        stats = []
        for age_min, age_max, label in age_groups:
            age_df = df[(df['Age'] >= age_min) & (df['Age'] <= age_max)]
            survived = age_df['Survived'].sum()
            total = len(age_df)
            died = total - survived
            survival_rate = round((survived / total) * 100, 2) if total > 0 else 0
            
            stats.append({
                'ageGroup': label,
                'survived': int(survived),
                'died': int(died),
                'total': int(total),
                'survivalRate': survival_rate
            })
        
        return create_response(True, stats)
    
    except Exception as e:
        return create_response(False, error=str(e))

@app.get("/api/stats/embarked")
async def get_survival_by_embarked():
    """Get survival statistics by port of embarkation."""
    try:
        stats = []
        port_names = {'S': 'Southampton', 'C': 'Cherbourg', 'Q': 'Queenstown'}
        
        for port in ['S', 'C', 'Q']:
            port_df = df[df['Embarked'] == port]
            survived = port_df['Survived'].sum()
            total = len(port_df)
            died = total - survived
            survival_rate = round((survived / total) * 100, 2) if total > 0 else 0
            
            stats.append({
                'port': port,
                'portName': port_names.get(port, port),
                'survived': int(survived),
                'died': int(died),
                'total': int(total),
                'survivalRate': survival_rate
            })
        
        return create_response(True, stats)
    
    except Exception as e:
        return create_response(False, error=str(e))

@app.post("/api/predict")
async def predict_survival(input_data: PredictionInput):
    """Predict survival based on passenger details."""
    try:
        # Convert input to DataFrame
        input_df = pd.DataFrame({
            'Pclass': [input_data.pclass],
            'Sex': [input_data.sex],
            'Age': [input_data.age],
            'SibSp': [input_data.sibsp],
            'Parch': [input_data.parch],
            'Fare': [input_data.fare],
            'Embarked': [input_data.embarked]
        })
        
        # Make prediction
        survival_proba = model.predict_proba(input_df)[0][1]  # Probability of survival
        survival = bool(survival_proba > 0.5)
        
        # Create result
        result = {
            'survival': survival,
            'probability': float(survival_proba),
            'features': {
                'pclass': input_data.pclass,
                'sex': input_data.sex,
                'age': input_data.age,
                'sibsp': input_data.sibsp,
                'parch': input_data.parch,
                'fare': input_data.fare,
                'embarked': input_data.embarked
            }
        }
        
        return create_response(True, result)
    
    except Exception as e:
        return create_response(False, error=str(e))

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Welcome to the Titanic Survival API"}

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)