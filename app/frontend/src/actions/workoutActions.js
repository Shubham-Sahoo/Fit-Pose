// src/actions/workoutActions.js
import axios from 'axios';

export const getWorkouts = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:5001/api/workouts', {
    headers: { 'x-auth-token': token },
  });

  dispatch({ type: 'GET_WORKOUTS', payload: res.data });
};

