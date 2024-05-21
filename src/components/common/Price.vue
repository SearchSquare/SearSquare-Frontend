<script setup>
const { price, label } = defineProps({
  price: Number,
  label: String,
});

const formatPrice = (price) => {
  const billion = Math.floor(price / 10000); // 백만 원 단위로 넘어오는 값을 10000으로 나누어 억 단위를 구합니다.
  const million = Math.floor((price % 10000) / 1000); // 나머지 값을 1000으로 나누어 천만 원 단위를 구합니다.
  if (price === 0) {
    return '거래없음';
  }
  return `${billion ? `${billion}억` : ''} ${million ? `${million}천만원` : '원'}`;
};
</script>

<template>
  <div class="price-card d-flex flex-column">
    <span class="text-muted">{{ label }}</span>
    <span
      :class="{
        'd-flex': true,
        'justify-content-center': true,
        'price-value': true,
        'lowest-price': label === '최저가',
        'highest-price': label === '최고가',
      }"
      >{{ formatPrice(price) }}</span
    >
  </div>
</template>

<style scoped>
.price-card {
  width: 100px;
  margin: 5px 0px;
  align-items: center;
}

.text-muted {
  color: #6c757d;
  font-size: 16px;
  font-weight: bold;
}

.price-value {
  width: 100%;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 10px;
}

.lowest-price {
  background-color: #fe9f99;
  color: #b52a54;
}

.highest-price {
  background-color: #c3ee83;
  color: #489019;
}
</style>
