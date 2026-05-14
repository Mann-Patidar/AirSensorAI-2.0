from pydantic import BaseModel, Field, computed_field
from typing import Annotated
from datetime import datetime

class esp32_input(BaseModel):
    
    aqi: Annotated[float, Field(..., description= "Aqi sensor data from esp 32")]


class all_input(BaseModel):
    
    aqi: Annotated[float, Field(..., description= "Aqi sensor data from esp 32")]
    temp: Annotated[float, Field(..., description= "Temperature from esp32")]
    humidity: Annotated[float, Field(..., description= "Humidity data from esp32")]
    date_time: Annotated[datetime, Field(..., description= "Date and time at which data is added.")]

    