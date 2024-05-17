<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const naverLogin = new window.naver.LoginWithNaverId({
    clientId: 'WN7VQqB2P_bciTlar5yV',
    callbackUrl: 'http://localhost:5173/login/progress',
    isPopup: false,
    loginButton: { color: 'green', type: 3, height: 40 },
  });
  naverLogin.init();
  // URL의 해시 부분에서 필요한 데이터를 추출하는 로직입니다.
  const handleLoginProgress = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1); // `substr` 대신 `slice` 사용
      const params = new URLSearchParams(hash);
      console.log(params.get('access_token'));
    }
    // 추가 로직 구현: 예를 들어 서버에 토큰을 전송하거나 로컬 스토리지에 저장할 수 있습니다.
  };

  handleLoginProgress();
  naverLogin.getLoginStatus(function (status) {
    if (status) {
      const accessToken = naverLogin.accessToken.accessToken;
      console.log('Access Token : ', accessToken);
      // 서버에 accessToken 전송
      fetch('http://localhost:8080/members/oauth/naver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: accessToken }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    }
  });
});
</script>

<template>
  <div>
    <!-- Naver Login Button -->
    <div id="naverIdLogin"></div>
  </div>
</template>

<style scoped>
#naverIdLogin {
  padding-top: 200px;
}
</style>
