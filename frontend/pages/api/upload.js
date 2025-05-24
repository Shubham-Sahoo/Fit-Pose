export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    // Simulating backend upload handling
    try {
      const file = req.body; // In a real-world case, parse the formData
      console.log("File uploaded:", file);
  
      res.status(200).json({ message: "File uploaded successfully", file });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  }
  