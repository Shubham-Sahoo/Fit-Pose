import os
import cv2
import subprocess
import mediapipe as mp

def analyze_video(input_path):
    """
    Analyzes the input video for pose detection, processes it, and stores the processed video.

    Args:
        input_path (str): Path to the input video file.

    Returns:
        str: Path to the processed video file.
    """
    # Initialize MediaPipe Pose and Drawing utilities
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose()
    mp_drawing = mp.solutions.drawing_utils

    # Prepare output path
    output_path = input_path.replace("uploads", "processed")
    
    temp_output_path = output_path.replace(".mp4", "_temp.mp4")

    # Read input video and prepare to write processed video
    cap = cv2.VideoCapture(input_path)
    out = cv2.VideoWriter(
        temp_output_path,
        cv2.VideoWriter_fourcc(*'mp4v'),
        cap.get(cv2.CAP_PROP_FPS),  # Use the input video's FPS
        (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))
    )

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        # Process each frame with MediaPipe Pose
        results = pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        
        # Draw pose landmarks on the frame if detected
        if results.pose_landmarks:
            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        
        # Write the processed frame to the output video
        out.write(frame)

    # Release resources
    cap.release()
    out.release()
    pose.close()
    
    # Compress the video using ffmpeg
    compress_video(temp_output_path, output_path)

    # Clean up temporary file
    os.remove(temp_output_path)

    return output_path


def compress_video(input_path, output_path):
    """
    Compress the video using ffmpeg.
    """
    ffmpeg_command = [
        "ffmpeg",
        "-i", input_path,            # Input file
        "-vcodec", "libx264",       # Use H.264 codec for compression
        "-crf", "28",               # Adjust quality (lower is better, 28 is a reasonable default)
        "-preset", "medium",        # Compression speed/quality trade-off
        output_path
    ]
    subprocess.run(ffmpeg_command, check=True)