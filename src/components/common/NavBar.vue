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
        <ul class="navbar-nav">
          <RouterLink class="navbar-brand" to="/">
            <img src="/src/assets/Logo.png" alt="Map" class="img-fluid" />서치스퀘어
          </RouterLink>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/api-docs">API문서</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                style="border-radius: 20px"
                src="/src/assets/Logo.png"
                alt="Map"
                class="img-fluid"
              />
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <RouterLink class="dropdown-item" to="{name: 'mypage'}">마이페이지</RouterLink>
              </li>
              <li><RouterLink class="dropdown-item" to="{name: 'logout'}">로그아웃</RouterLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
.navbar-nav > li {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
}
</style>
