import os

class Config:
    UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads/")
    MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", "50"))
