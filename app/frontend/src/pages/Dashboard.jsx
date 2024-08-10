// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutList from '../components/WorkoutList';
import AddWorkout from '../components/AddWorkout';
import WorkoutRecommendation from '../components/WorkoutRecommendation';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const navigate = useNavigate();

  // Function to fetch workouts
  const fetchWorkouts = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/workouts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      } else {
        setError(data.message || 'Failed to fetch workouts');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleAddWorkout = () => {
    setShowAddWorkout(!showAddWorkout);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={toggleAddWorkout}>
        {showAddWorkout ? 'Hide Add Workout' : 'Add Workout'}
      </button>

      {showAddWorkout && <AddWorkout refreshWorkouts={fetchWorkouts} />}
      <WorkoutRecommendation />

      {error && <p className="error">{error}</p>}
      <WorkoutList workouts={workouts} />
    </div>
  );
};

export default Dashboard;
