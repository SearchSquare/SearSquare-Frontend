<template>
  <div class="card house-card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <h5 class="card-title">자이아파트</h5>
          <p class="card-text">서울시 강남구</p>
        </div>
        <div class="col-md-3 text-center">
          <h6>최고가</h6>
          <Price />
        </div>
        <div class="col-md-3 text-center">
          <h6>최저가</h6>
          <Price />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Price from '@/components/common/Price.vue';

defineProps({
  house: Object,
});
</script>

<style scoped>
.house-card {
  border-radius: 10px;
  margin: 10px 0;
  width: 592px;
  position: relative;
}

.card-title {
  font-weight: bold;
}
.card-text {
  font-size: 12px;
}
</style>
