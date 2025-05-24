import Head from "next/head";
import { useState } from "react";
import UploadForm from "../components/UploadForm";

export default function Home() {
  const [processedVideoUrl, setProcessedVideoUrl] = useState(null);

  // Callback to receive processed video URL from UploadForm
  const handleProcessedVideo = (url) => {
    setProcessedVideoUrl(url);
  };

  return (
    <>
      <Head>
        <title>Personalized Fitness AI</title>
        <meta name="description" content="Upload videos for pose correction" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          padding: "0 1rem",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Upload Your Fitness Video
        </h1>

        {/* Pass callback to UploadForm */}
        <UploadForm onProcessedVideo={handleProcessedVideo} />

        {/* Show processed video if available */}
        {processedVideoUrl && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <h2>Processed Video Output</h2>
            <video
              src={processedVideoUrl}
              controls
              style={{ maxWidth: "100%", borderRadius: 8 }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </main>
    </>
  );
}
