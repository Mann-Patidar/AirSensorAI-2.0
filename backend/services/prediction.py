import joblib
import numpy as np

# Load trained ML model
model = joblib.load("backend/models/aqi_model.pkl")

def predict_aqi(mq135, temperature, humidity):

    # Prepare input
    data = np.array([
        [mq135, temperature, humidity]
    ])

    # Predict AQI
    prediction = model.predict(data)

    return round(prediction[0], 2)