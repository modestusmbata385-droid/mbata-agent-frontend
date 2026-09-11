import axios from 'axios';

// Single axios instance for the whole app. Auth token attachment and
// 401-triggered logout will be added alongside the real auth flow (Phase 2).
//
// >>> BADILISHA MSTARI ULIO CHINI <<<
// Badilisha '/api' kuwa: 'https://JINA-LA-BACKEND-YAKO.onrender.com/api'
const api = axios.create({
  baseURL: '/api',
});

export default api;
