import axios from 'axios';

const Http = axios.create({
    baseURL: "http://192.168.43.125:8000/",
});

const api = {
    postSignup: (body) => Http.post('api/auth/signup', body),
    
}; 

export default api;