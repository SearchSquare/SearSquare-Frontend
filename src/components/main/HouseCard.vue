<script setup>
import Price from '@/components/common/Price.vue';

const props = defineProps({
  house: Object,
});

const {
  aptId,
  name,
  lat,
  lng,
  builtYear,
  jibun,
  address: { sido, gugun, dong, dongCode },
  price: { maxPrice, minPrice },
} = props.house;

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.house.lat, props.house.lng);
};
</script>

<template>
  <div class="house-card col card my-2" @click="handleClick">
    <div class="card-body d-flex">
      <div class="col-4 align-items-center">
        <h5 class="card-title">{{ name }}</h5>
        <p class="card-text">
          {{ sido }} {{ gugun }}
          {{ dong }}
          {{ jibun }}
        </p>
      </div>
      <div class="col-8 d-flex justify-content-evenly align-items-center">
        <Price :price="maxPrice" label="최고가" />
        <Price :price="minPrice" label="최저가" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.house-card {
  border-radius: 10px;
  margin: 10px 0;
  position: relative;
}

.card-title {
  font-weight: bold;
}
.card-text {
  font-size: 12px;
}
</style>
