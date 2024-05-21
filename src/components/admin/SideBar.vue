<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="d-flex sidenav">
    <div class="bg-light background" style="width: 250px">
      <nav class="nav flex-column">
        <RouterLink
          class="nav-link btn btn-light mb-3 d-flex justify-content-between align-items-center text-dark"
          :to="{ name: 'ServiceStatistics' }"
        >
          서비스 통계
          <span class="text-dark">&gt;</span>
        </RouterLink>
        <RouterLink
          class="nav-link btn btn-light mb-3 d-flex justify-content-between align-items-center text-dark"
          :to="{ name: 'MemberManagement' }"
        >
          회원 관리
          <span class="text-dark">&gt;</span>
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  margin-bottom: 20px;
  text-align: left;
  font-size: 1.5em;
  color: black; /* 추가된 부분 */
}

.nav-link span {
  color: black; /* 추가된 부분 */
}
</style>
