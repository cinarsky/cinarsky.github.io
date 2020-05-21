import axios from 'axios';

const api = axios.create({
  baseURL: 'http://47.96.148.104/api',
  withCredentials: true,
});

export default api;
