import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

ROOT_DIR = Path(__file__).resolve().parents[1]
load_dotenv(ROOT_DIR / ".env")

uri = os.getenv("MONGODB_URI")
if not uri:
    raise ValueError("MONGODB_URI is not set. Add it to a .env file or export it in your shell.")

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