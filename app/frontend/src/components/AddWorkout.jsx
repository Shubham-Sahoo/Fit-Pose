// src/components/AddWorkout.jsx
import React, { useState } from 'react';

const AddWorkout = ({ refreshWorkouts }) => {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5001/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ type, duration, caloriesBurned }),
      });

      if (response.ok) {
        // Clear form and refresh workouts
        setType('');
        setDuration('');
        setCaloriesBurned('');
        refreshWorkouts();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add workout');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h3>Add Workout</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workout Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Calories Burned"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
        />
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default AddWorkout;
