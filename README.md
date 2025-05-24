# AI Fitness Project

This project leverages computer vision techniques and machine learning models to provide personalized fitness guidance. It evaluates users' poses in real-time using uploaded videos and provides actionable feedback for better posture and form.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
The AI Fitness project aims to assist users in achieving their fitness goals by analyzing their exercise form through videos. Users can upload videos, and the system will:
- Detect and evaluate their posture.
- Provide corrections and suggestions in real-time.
- Save analysis results for future review.

---

## Features
- **Real-time Pose Analysis:** Evaluate user posture from uploaded videos.
- **Feedback Mechanism:** Suggest corrections for better form.
- **Cross-platform Support:** Accessible via a web frontend.
- **Modular Design:** Clear separation of backend, frontend, and shared modules.

---

## Project Structure
```plaintext
personalized_fitness_ai/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                # FastAPI app
│   │   ├── config.py             # Configuration settings
│   │   ├── routers/              # API route handlers
│   │   │   ├── __init__.py
│   │   │   ├── upload.py         # Upload video route
│   │   └── utils/                # Utility functions
│   │       ├── __init__.py
│   │       ├── file_manager.py   # File management utilities
│   │       └── pose_analysis.py  # Core pose analysis logic
│   └── requirements.txt          # Python dependencies
├── frontend/
│   ├── public/
│   │   ├── index.html            # Main HTML page
│   │   ├── styles.css            # CSS styles
│   │   └── script.js             # Client-side JavaScript
│   └── README.md                 # Frontend setup instructions
├── shared/
│   ├── __init__.py
│   ├── models.py                 # Shared data models
│   └── validators.py             # Input validation utilities
├── tests/
│   ├── test_backend.py           # Backend tests
│   ├── test_frontend.py          # Frontend tests
│   └── test_pose_analysis.py     # Core module tests
└── README.md                     # Project overview and setup guide
```

---

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- Redis server

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Open `index.html` in your browser to access the frontend.

---

## Usage
1. Start the backend server.
2. Open the frontend in a browser.
3. Upload a video and receive posture analysis in real-time.

---

## Technologies Used
- **Backend:** FastAPI, Python
- **Frontend:** HTML, CSS, JavaScript
- **Core:** OpenCV, Mediapipe
- **Database:** Redis

---

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.
