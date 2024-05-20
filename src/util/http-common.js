import axios from 'axios';

const VITE_VUE_API_URL = 'http://localhost:8080';
// local vue api axios instance
function localAxios() {
  const accessToken = sessionStorage.getItem('accessToken');
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken ? accessToken : '',
    },
  });
  return instance;
}

export { localAxios };
