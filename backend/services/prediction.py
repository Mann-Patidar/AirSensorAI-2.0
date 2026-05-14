import joblib
import numpy as np
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parents[1] / "models" / "aqi_model.pkl"
# Load trained ML model
model = joblib.load(MODEL_PATH)

def predict_aqi(mq135, temperature, humidity):

    # Prepare input
    data = np.array([
        [mq135, temperature, humidity]
    ])

    # Predict AQI
    prediction = model.predict(data)

    return round(prediction[0], 2)