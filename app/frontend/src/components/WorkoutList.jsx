// src/components/WorkoutList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/workouts', {
        headers: { 'x-auth-token': token },
      });
      setWorkouts(res.data);
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h3>Your Workouts</h3>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            {workout.type} - {workout.duration} minutes - {workout.caloriesBurned} calories
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutList;

