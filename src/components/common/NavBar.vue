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
          <li class="nav-item">
            <img
              style="border-radius: 20px"
              src="/src/assets/Logo.png"
              alt="Map"
              class="img-profile img-fluid"
            />
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menu
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'Mypage' }">마이페이지</RouterLink>
              </li>
              <li><a class="dropdown-item" href="#">로그아웃</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.img-logo,
.img-profile {
  width: 40px;
  height: 40px;
}
</style>
