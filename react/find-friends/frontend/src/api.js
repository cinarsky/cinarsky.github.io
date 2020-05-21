import axios from 'axios'
import host from './host'
export default axios.create({

    baseURL: host,
    timeout: 2000,
    withCredentials:true
  });
  