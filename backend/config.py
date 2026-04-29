from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://AirSensorAI:AirSensonAI@airsensor-ai.ex0eua9.mongodb.net/?appName=AirSensor-AI"

# Create a new client with optimized connection pooling
client = MongoClient(
    uri, 
    server_api=ServerApi('1'),
    # Connection pool optimization
    maxPoolSize=50,           # Maximum connections in pool
    minPoolSize=10,           # Minimum pre-warmed connections
    maxIdleTimeMS=60000,      # Close idle connections after 60 seconds
    # Timeout settings
    connectTimeoutMS=10000,   # Connection timeout: 10 seconds
    socketTimeoutMS=30000,    # Socket timeout: 30 seconds
    serverSelectionTimeoutMS=5000,  # Server selection timeout: 5 seconds
)

db = client.todo_db

collection_name = db["sensor_data"]