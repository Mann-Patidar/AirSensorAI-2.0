from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.prediction import predict_aqi

router = APIRouter()

# Request body format
class AQIData(BaseModel):
    mq135: float
    temperature: float
    humidity: float

# Prediction endpoint
@router.post("/predict")
def predict(data: AQIData):

    predicted_aqi = predict_aqi(
        data.mq135,
        data.temperature,
        data.humidity
    )

    return {
        "predicted_aqi": predicted_aqi
    }