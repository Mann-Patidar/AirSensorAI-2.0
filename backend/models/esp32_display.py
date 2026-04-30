from pydantic import BaseModel, Field
from typing import Dict

class display_response(BaseModel):

    aqi: str = Field(..., description= "Calculated aqi data")
    temp: str = Field(..., description= "Temperature to display")
    humidity: str = Field(..., description=  "Humidity to display")