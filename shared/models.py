from pydantic import BaseModel

class VideoAnalysisResult(BaseModel):
    status: str
    video_path: str
