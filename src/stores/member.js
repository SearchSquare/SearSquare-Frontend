import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { loginWithNaverApi } from '@/api/member/member.js';

export const useMemberStore = defineStore('memberStore', () => {
  const isLogin = ref(sessionStorage.getItem('isLogin') === 'true');
  const router = useRouter();

  const loginWithNaverStore = async (naverToken) => {
    await loginWithNaverApi(
      naverToken,
      (response) => {
        if (response.data.code == 2000) {
          const { token } = response.data.response;
          const { accessToken } = token;
          console.log('[store] 로그인 성공!');
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('isLogin', 'true');
          isLogin.value = true;
          router.replace({ name: 'Main' });
        }
      },
      (error) => {
        console.log('[store] 로그인 실패');
        console.log(error);
        sessionStorage.removeItem('accessToken');
        sessionStorage.setItem('isLogin', 'false');
        isLogin.value = false;
        router.replace({ name: 'Login' });
      }
    );
  };

  return {
    isLogin,
    loginWithNaverStore,
  };
});
