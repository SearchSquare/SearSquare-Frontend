<script setup>
import { onMounted } from 'vue';
import { oauthNaver } from '@/api/member/login.js';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = import.meta.env.VITE_NAVER_CALLBACK_URL;

  const naverLogin = new window.naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,
    callbackUrl: NAVER_CALLBACK_URL,
    isPopup: false,
    loginButton: { color: 'green', type: 3, height: 40 },
  });

  naverLogin.init();

  naverLogin.getLoginStatus((status) => {
    if (status) {
      const accessToken = naverLogin.accessToken.accessToken;
      console.log(accessToken);
      login(accessToken);
    }
  });
});

const login = async (accessToken) => {
  const response = await oauthNaver(accessToken);
  console.log(accessToken);
  if (response.data.code == 2000) {
    console.log(response.data.result);
    router.replace({ name: 'Main' });
  } else {
    console.error('로그인 에러:', response.data.message);
  }
};
</script>

<template>
  <div
    class="vh-100 d-flex flex-column align-items-center justify-content-center bg-light"
  >
    <h1 class="typewriter mb-3 display-4">안녕하세요</h1>
    <p class="text-muted mb-2">네이버 계정으로 간편하게 로그인하세요.</p>
    <div id="naverIdLogin" class="mb-5"></div>
  </div>
</template>

<style scoped>
#naverIdLogin button {
  width: 100%; /* 버튼을 컨테이너 너비에 맞춤 */
}
</style>
