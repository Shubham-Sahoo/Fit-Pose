from fastapi import APIRouter, File, UploadFile
from app.utils.pose_analysis import analyze_pose
from app.utils.file_manager import save_file

router = APIRouter()

@router.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    file_path = await save_file(file)
    analysis_results = analyze_pose(file_path)
    return {"results": analysis_results}
