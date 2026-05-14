from fastapi import APIRouter, HTTPException, Query
from database.schemas import list_data
from config import collection_name, API_KEY
from models.esp32_input import esp32_input
import models
from bson import ObjectId
import requests


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
        'status': 'OK'
    }

@router.get('/')
def home():
    return {'message': "hi"}


@router.get('/a')
async def get_data(limit: int = Query(100, le=1000), skip: int = Query(0, ge=0)):
    try:
        # Fetch only limited number of documents with pagination
        data = list_data(collection_name.find().limit(limit).skip(skip))
        
        # Get total count for pagination metadata
        total = collection_name.count_documents({})
        
        return {
            "status": "success",
            "data": data,
            "pagination": {
                "limit": limit,
                "skip": skip,
                "total": total
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch data: {str(e)}")

@router.post('/add_data')
async def add_data(data : esp32_input):
    try:
        result = collection_name.insert_one(dict(data))
        return {
            "status_code": 201,
            "message": "Data added successfully",
            "inserted_id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add data: {str(e)}")

@router.put('/{id}')
async def update_data(id : str, inp: esp32_input):
    try:
        id = ObjectId(id)
        # Use find_one to check if document exists
        curr_doc = collection_name.find_one({"_id": id})
        if not curr_doc:
            raise HTTPException(status_code=404, detail="Data not found")
        collection_name.update_one({"_id": id}, {"$set": dict(inp)})
        return {"status_code": 200, "message": "Data Updated successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update data: {str(e)}")


@router.get("/wheather_api/{city}")
def data(city : str):
    try:
        url = "https://api.openweathermap.org/data/2.5/weather"

        params = {
            "q": city,
            "appid": API_KEY,
            "units": "metric"
        }

        response = requests.get(url, params=params)
        data = response.json()

        if response.status_code != 200:
            return "Weather data not found."

        temp = data["main"]["temp"]
        humidity = data["main"]["humidity"]

        return {
            "temp" : str(temp),
            "humidity" : str(humidity)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch data: {str(e)}")