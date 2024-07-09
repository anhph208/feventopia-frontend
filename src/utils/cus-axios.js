import axios from 'axios';

// Create an instance of axios
const config = axios.create({
  baseURL: 'https://feventopia.azurewebsites.net',
});

// Interceptor to add the Authorization header for each request
config.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default config;
