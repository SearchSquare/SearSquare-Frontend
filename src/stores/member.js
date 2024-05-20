import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';

import { loginWithNaverApi } from '@/api/member/member.js';

export const useMemberStore = defineStore(
  'memberStore',
  () => {
    const router = useRouter();

    const isLogin = ref(false);
    const isValidToken = ref(false);

    const loginWithNaverStore = async (naverToken) => {
      await loginWithNaverApi(
        naverToken,
        (response) => {
          if (response.data.code == 2000) {
            const { token } = response.data.response;
            const { accessToken } = token;
            isLogin.value = true;
            isValidToken.value = true;
            console.log('로그인 성공!');
            console.log('isLogin: ', isLogin.value);
            sessionStorage.setItem('accessToken', accessToken);
            router.replace({ name: 'Main' });
          }
        },
        (error) => {
          console.log('로그인 실패!!!!');
          isLogin.value = false;
          isValidToken.value = false;
        }
      );
    };

    return {
      isLogin,
      isValidToken,
      loginWithNaverStore,
    };
  },
  {
    persist: true,
  }
);
