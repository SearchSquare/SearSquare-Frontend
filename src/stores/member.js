import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { loginWithNaverApi } from '@/api/member/member.js';

export const useMemberStore = defineStore('memberStore', () => {
  const isLogin = ref(sessionStorage.getItem('isLogin') === 'true');
  const router = useRouter();
  const nickname = ref(sessionStorage.getItem('nickname'));
  const profileImg = ref(sessionStorage.getItem('profileImg'));

  const loginWithNaverStore = async (naverToken) => {
    await loginWithNaverApi(
      naverToken,
      (response) => {
        if (response.data.code == 2000) {
          const { token, nickname, profileImg } = response.data.response;
          const { accessToken } = token;
          console.log('[store] 로그인 성공!');
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('isLogin', 'true');
          sessionStorage.setItem('nickname', nickname);
          sessionStorage.setItem('profileImg', profileImg);
          isLogin.value = true;
          router.replace({ name: 'Main' });
        }
      },
      (error) => {
        console.log('[store] 로그인 실패');
        console.log(error);
        sessionStorage.setItem('accessToken', null);
        sessionStorage.setItem('isLogin', 'false');
        sessionStorage.setItem('nickname', null);
        sessionStorage.setItem('profileImg', null);
        isLogin.value = false;
        router.replace({ name: 'Login' });
      }
    );
  };

  return {
    isLogin,
    nickname,
    profileImg,
    loginWithNaverStore,
  };
});
