<script>
    document.addEventListener("DOMContentLoaded", function () {
        const uploadForm = document.getElementById("upload-form");
        const videoInput = document.getElementById("video");

        // Ensure the form and input elements are present
        if (!uploadForm || !videoInput) {
            console.error("Upload form or video input element not found in the DOM.");
            return;
        }

        uploadForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Check if a file is selected
            if (!videoInput.files || videoInput.files.length === 0) {
                alert("Please select a video file to upload.");
                return;
            }

            const video = videoInput.files[0];
            const formData = new FormData();
            formData.append("file", video);

            try {
                // Start the fetch request
                const response = await fetch("http://127.0.0.1:8000/api/v1/upload", {
                    method: "POST",
                    body: formData,
                });

                // Check for HTTP response errors
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
                }

                // Process the response
                const result = await response.json();

                // Provide user feedback for success
                alert("Upload successful! Processing your video.");
                
                // Create a download link for the processed video
                if (result.processed_video_url) {
                    const downloadLink = document.createElement("a");
                    downloadLink.href = result.processed_video_url;
                    downloadLink.textContent = "Download Processed Video";
                    downloadLink.download = "processed_video.mp4"; // Suggested filename for the user
                    document.body.appendChild(downloadLink);
                    downloadLink.click(); // Simulate a click for the user
                    document.body.removeChild(downloadLink); // Clean up
                } else {
                    alert("Video uploaded but no processed video URL returned.");
                }
            } catch (error) {
                console.error("Error during video upload:", error);
                alert("Failed to upload video. Please check the console for details.");
            }
        });
    });
</script>
