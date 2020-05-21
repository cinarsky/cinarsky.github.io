import axios from 'axios'
import host from './host'
var api =axios.create({
    baseURL:`http://${host}:5000/api`,
    withCredentials:true

})
export default api