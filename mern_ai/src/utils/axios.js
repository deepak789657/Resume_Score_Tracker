import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000',
})

export default instance;


// 3:55 min