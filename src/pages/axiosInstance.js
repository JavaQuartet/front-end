import axios from 'axios';


const API_URL = 'http://3.39.75.222:8080'; // 실제 API 주소로 변경


const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
