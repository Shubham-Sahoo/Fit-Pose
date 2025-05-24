from fastapi import FastAPI
from app.routers import upload

app = FastAPI()

app.include_router(upload.router, prefix="/api/v1", tags=["uploads"])
