<script setup>
import SideBar from '@/components/admin/SideBar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="d-flex">
    <div class="sidebar">
      <SideBar />
    </div>
    <div class="content flex-grow-1 p-3">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.d-flex {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  height: calc(100vh - 66px); /* Adjust if necessary */
  position: fixed; /* Make sidebar fixed */
  top: 66px;
}

.content {
  margin-top: 66px; /* Adjust if necessary */
  margin-left: 250px; /* Adjust width based on sidebar width */
  width: calc(100% - 250px); /* Adjust width based on sidebar width */
}
</style>
