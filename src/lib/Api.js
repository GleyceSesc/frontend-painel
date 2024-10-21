import axios from 'axios';

const Api = () => {
  return axios.create({
    baseURL: 'http://localhost:8000/',
    data: {}
  });
};

export default Api;