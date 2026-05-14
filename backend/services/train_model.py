import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Load dataset
df = pd.read_csv("backend/aqi_data.csv")

# Features
X = df[['mq135', 'temperature', 'humidity']]

# Target
y = df['aqi']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create model
model = RandomForestRegressor()

# Train model
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "backend/models/aqi_model.pkl")

print("Model trained successfully")