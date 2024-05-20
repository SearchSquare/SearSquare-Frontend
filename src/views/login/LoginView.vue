<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '@/stores/member.js';
import { storeToRefs } from 'pinia';

const naverToken = ref('');
const router = useRouter();

const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);
const { loginWithNaverStore } = memberStore;

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
    if (!isLogin.value) {
      if (status) {
        loginWithNaver(naverLogin.accessToken.accessToken);
      }
    }
  });
});

const loginWithNaver = async (naverToken) => {
  await loginWithNaverStore(naverToken);
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
