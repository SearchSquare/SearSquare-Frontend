<script setup>
import { ref, onMounted } from 'vue';
import { getSido } from './api/GetRegion.js';
import Dropdown from '@/components/main/Dropdown.vue';

const sidoData = ref([]);
const gugunData = ref([]);
const dongData = ref([]);
const sidoName = ref(null);
const gugunName = ref(null);
const dongName = ref(null);

onMounted(async () => {
  const response = await getSido();
  console.log(response);
  console.log(response.data);
  if (response.data.code == 2000) {
    sidoData.value = response.data;
    console.log(sidoData.value);
  } else {
    // TODO: 에러 정하기
  }
});
</script>

<template>
  <div>
    <div class="input-group mb-3">
      <Dropdown :items="sidoData" id="sido" @clickItem="onClickSido" defaultText="시/도" />
      <Dropdown :items="gugunData" id="gugun" @clickItem="onClickgugun" defaultText="구/군" />
      <Dropdown :items="dongData" id="dong" @clickItem="onClickdong" defaultText="읍/면/동" />
      <button type="button" class="btn btn-primary rounded-pill">검색</button>
    </div>
  </div>
</template>

<style scoped></style>
