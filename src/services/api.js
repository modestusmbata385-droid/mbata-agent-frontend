import axios from 'axios';

// Single axios instance for the whole app. Auth token attachment and
// 401-triggered logout will be added alongside the real auth flow (Phase 2).
const api = axios.create({
  baseURL: 'https://mbata-agent-backend.onrender.com/api',
});

export default api;
