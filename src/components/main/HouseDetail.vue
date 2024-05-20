<template>
  <div
    class="offcanvas offcanvas-center"
    tabindex="-1"
    ref="offcanvas"
    aria-labelledby="houseDetailSidebarLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="houseDetailSidebarLabel">House Detail</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body" v-if="house">
      <h5>{{ house.name }}</h5>
      <p>{{ house.sido }} {{ house.gugun }} {{ house.dong }} {{ house.jibun }}</p>
      <p>Built Year: {{ house.builtYear }}</p>
      <Price :price="house.price.maxPrice" label="최고가" />
      <Price :price="house.price.minPrice" label="최저가" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, onMounted } from 'vue';
import Price from '@/components/common/Price.vue';
import { Offcanvas } from 'bootstrap';

const props = defineProps({
  house: {
    type: Object,
    default: () => ({}), // 기본 값을 빈 객체로 설정
  },
  show: Boolean,
});

const offcanvas = ref(null);
let offcanvasInstance = null;

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      if (offcanvasInstance) {
        offcanvasInstance.dispose();
      }
      offcanvasInstance = new Offcanvas(offcanvas.value, { backdrop: false });
      offcanvasInstance.show();
    }
  }
);

onMounted(() => {
  offcanvasInstance = new Offcanvas(offcanvas.value, { backdrop: false });
});
</script>

<style scoped>
.offcanvas-center {
  width: 500px;
  height: 100%;
  transform: translate(-100%, 0%);
  position: absolute;
  z-index: 5;
}
</style>
