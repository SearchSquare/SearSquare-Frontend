// src/util/http-common.js

import axios from 'axios';
import router from '@/router'; // vue-router 인스턴스를 가져옵니다.

const VITE_VUE_API_URL = import.meta.env.VITE_VUE_API_URL; // 환경 변수에서 API URL 가져오기

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken');
    console.log(token);
    console.log(token == null);
    if (token == null) {
      router.push({ name: 'Login' });
    }
    return config;
  });

  // 응답 인터셉터 추가
  instance.interceptors.response.use(
    (response) => {
      // 응답이 성공적인 경우 그대로 반환합니다.
      return response;
    },
    (error) => {
      // 응답 오류가 있는 경우 처리합니다.
      if (error.response) {
        const status = error.response.status;
        if (status === 401 || status === 403 || status === 500) {
          // 401 Unauthorized 또는 403 Forbidden 오류가 발생하면 로그인 페이지로 리다이렉트합니다.
          router.push({ name: 'Login' });
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export { localAxios };
