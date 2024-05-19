<script setup>
defineProps({
  price: Number,
});
</script>
<!-- props로 가격받아와서 띄워주기 -->
<template>
  <p class="text-muted">{{ price }}</p>
</template>
<style scoped></style>
