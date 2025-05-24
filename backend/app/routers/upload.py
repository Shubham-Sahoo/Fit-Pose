from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse
import shutil
import os
from app.utils.pose_analysis import analyze_video

router = APIRouter()

UPLOAD_DIR = "uploads"
PROCESSED_DIR = "uploads/processed"

# Ensure directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

@router.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    """
    Handles video uploads and returns the processed video file.
    """
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Process the video
    processed_path = analyze_video(file_path)

    # Return the processed video file
    return FileResponse(
        processed_path,
        media_type="video/mp4",
        filename=f"{file.filename}"
    )