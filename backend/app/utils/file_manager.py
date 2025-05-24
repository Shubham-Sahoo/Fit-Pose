import os
from app.config import Config

async def save_file(file):
    file_path = os.path.join(Config.UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    return file_path
