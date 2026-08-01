import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

// Projects
export const fetchProjects = () => API.get('/projects');

// Skills
export const fetchSkills = () => API.get('/skills');

// About
export const fetchAbout = () => API.get('/about');

// Analytics
export const fetchAnalytics = () => API.get('/analytics');
export const trackAnalytics = (type) => API.post('/analytics/track', { type });

// Contact
export const sendContactMessage = (data) => API.post('/contact', data);

// AI Tools Calls
export const callAiApi = (feature, prompt, contextData = {}) => 
  API.post('/ai/process', { feature, prompt, contextData });

export const sendAiChat = (prompt) => 
  API.post('/chat', { prompt });

export const analyzeResume = (prompt) => 
  API.post('/ai/resume-analysis', { prompt });

// Admin Login
export const adminLogin = (credentials) => 
  API.post('/auth/admin-login', credentials);

export default API;
