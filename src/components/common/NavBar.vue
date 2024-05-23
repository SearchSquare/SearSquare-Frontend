<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Initialize reactive variables
const profileImg = ref(sessionStorage.getItem('profileImg'));
const nickname = ref(sessionStorage.getItem('nickname'));

// Function to handle logout
const onClick = () => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.setItem('isLogin', 'false');
  sessionStorage.removeItem('profileImg');
  sessionStorage.removeItem('nickname');
  localStorage.removeItem('com.naver.nid.access_token');
  localStorage.removeItem('com.naver.nid.oauth.state_token');

  // Force update of reactive variables
  profileImg.value = null;
  nickname.value = null;
};

// Function to check and update session storage changes
const checkSessionStorage = () => {
  const newProfileImg = sessionStorage.getItem('profileImg');
  const newNickname = sessionStorage.getItem('nickname');
  if (profileImg.value !== newProfileImg) {
    profileImg.value = newProfileImg;
  }
  if (nickname.value !== newNickname) {
    nickname.value = newNickname;
  }
};

let intervalId;

onMounted(() => {
  checkSessionStorage(); // Initial check
  intervalId = setInterval(checkSessionStorage, 1000); // Check every second
});

onUnmounted(() => {
  clearInterval(intervalId); // Clear interval when component is unmounted
});
</script>

<template>
  <nav class="navbar navbar-expand-sm bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
        <RouterLink class="navbar-brand" :to="{ name: 'Main' }"
          ><img
            src="/src/assets/Logo.png"
            alt="Map"
            class="img-logo img-fluid"
          />서치스퀘어</RouterLink
        >
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'ApiDocs' }">API문서</RouterLink>
          </li>
          <li class="nav-item" v-if="profileImg">
            <img
              style="border-radius: 20px"
              :src="profileImg"
              alt="/src/assets/defaultprofile.png"
              class="img-profile img-fluid"
            />
          </li>
          <li class="nav-item dropdown" v-if="nickname">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ nickname }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#" @click="onClick">로그아웃</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.img-logo,
.img-profile {
  width: 40px;
  height: 40px;
}
</style>
