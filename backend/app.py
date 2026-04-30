from fastapi import FastAPI
from routes.route import router
import uvicorn
app = FastAPI()

app.include_router(router)


