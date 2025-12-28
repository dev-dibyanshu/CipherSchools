import axios from 'axios';

// API base URL configuration for different environments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || 'https://your-backend-url.com/api'  // Update with your deployed backend URL
  : process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Network error - please check your connection');
    } else {
      // Something else happened
      throw new Error('Request failed');
    }
  }
);

export const fetchAssignments = async () => {
  const response = await api.get('/assignments');
  return response.data;
};

export const fetchAssignment = async (id) => {
  const response = await api.get(`/assignments/${id}`);
  return response.data;
};

export const executeQuery = async (query, assignmentId = null) => {
  const response = await api.post('/execute', { query, assignmentId });
  return response.data;
};

export const getHint = async (assignmentId, query) => {
  const response = await api.post('/hint', { assignmentId, query });
  return response.data;
};

export const saveProgress = async (assignmentId, query, result) => {
  const response = await api.post('/save-progress', {
    assignmentId,
    query,
    result,
  });
  return response.data;
};

export default api;