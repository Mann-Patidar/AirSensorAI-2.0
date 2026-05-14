from pydantic import BaseModel

# Request body format
class AQIData(BaseModel):
    mq135: float
    temperature: float
    humidity: float