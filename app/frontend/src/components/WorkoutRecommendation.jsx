// src/components/WorkoutRecommendation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkoutRecommendation() {
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const fetchRecommendation = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/ai/recommendation', {
        headers: { 'x-auth-token': token },
      });
      setRecommendation(res.data.recommendation);
    };

    fetchRecommendation();
  }, []);

  return (
    <div>
      <h3>AI Workout Recommendation</h3>
      {recommendation ? <p>{recommendation}</p> : <p>Loading recommendation...</p>}
    </div>
  );
}

export default WorkoutRecommendation;

