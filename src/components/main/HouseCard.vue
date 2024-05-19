<template>
  <div class="house-card card mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ props.house.name }}</h5>
      <p class="card-text">
        {{ house.address.sido }} {{ house.address.gugun }} {{ house.address.dong }}
        {{ house.jibun }}
      </p>
      <div class="row">
        <div class="col">
          <h6>최고가</h6>
          <p class="text-muted">{{ house.price.maxPrice }}</p>
        </div>
        <div class="col">
          <h6>최저가</h6>
          <p class="text-muted">{{ house.price.minPrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Price from '@/components/common/Price.vue';

const props = defineProps({
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
