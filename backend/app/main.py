from fastapi import FastAPI
from app.routers import upload
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to your frontend's origin for production
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(upload.router, prefix="/api/v1", tags=["uploads"])
