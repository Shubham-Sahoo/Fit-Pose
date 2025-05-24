import { useState } from "react";

export default function UploadForm() {
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!video) {
      setMessage("Please select a video file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", video);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      setMessage(`Upload successful: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Failed to upload the video. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="video">Choose a video:</label>
      <input type="file" id="video" accept="video/*" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      <p>{message}</p>
    </form>
  );
}
