<script>
import { onMounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      if (window.naver) {
        const naverLogin = new window.naver.LoginWithNaverId({
          clientId: 'WN7VQqB2P_bciTlar5yV',
          callbackUrl: 'http://localhost:5173',
          isPopup: false,
          loginButton: { color: 'white', type: 2, height: 40 },
        });
        naverLogin.init();
      } else {
        console.error('Naver Login SDK not loaded.');
      }
    });
  },
};
</script>

<template>
  <div>
    <!-- Naver Login Button -->
    <div id="naverIdLogin"></div>
  </div>
</template>

<!-- <template>
  <div class="centered-container">
    <div class="card text-center mb-3" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">회원가입 / 로그인</h5>
        <p class="card-text">아파트 가격 통계를 손쉽게 확인하세요!</p>
        <a href="#" class="btn">
          <img id="naver-login" src="/src/assets/naverLogin.png" alt="" />
        </a>
      </div>
    </div>
  </div>
  <div id="naver_id_login">네이버 로그인</div>
</template> -->

<style scoped>
.centered-container {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  height: 100vh; /* 뷰포트 높이 전체를 사용 */
}

#naver-login {
  width: 200px;
}

#naverIdLogin {
  padding-top: 200px;
}
</style>
