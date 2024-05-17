<script setup>
import { ref, onMounted } from 'vue';
import { getGugun, getSido, getDong } from '@/api/house/GetRegion.js';
import Dropdown from '@/components/main/Dropdown.vue';

const sidoData = ref([]);
const gugunData = ref([]);
const dongData = ref([]);
const selectedSido = ref();
const selectedGugun = ref();
const selectedDong = ref();

onMounted(async () => {
  const response = await getSido();
  if (response.data.code == 2000) {
    sidoData.value = response.data.response;
  } else {
    // TODO: 에러 정하기
  }
});

const onClickSido = async (item) => {
  selectedSido.value = item;
  const response = await getGugun(selectedSido.value.dongCode);
  if (response.data.code == 2000) {
    gugunData.value = response.data.response;
  } else {
    // TODO: 에러 정하기
  }
};

const onClickGugun = async (item) => {
  selectedGugun.value = item;
  const response = await getDong(selectedGugun.value.dongCode);
  if (response.data.code == 2000) {
    dongData.value = response.data.response;
  } else {
    // TODO: 에러 정하기
  }
};

const onClickDong = (item) => {
  selectedDong.value = item;
};
</script>

<template>
  <div>
    <div class="input-group mb-3">
      <Dropdown
        class="dropdown"
        :items="sidoData"
        id="sido"
        @click-item="onClickSido"
        defaultText="시/도"
      />
      <Dropdown
        class="dropdown"
        :items="gugunData"
        id="gugun"
        @click-item="onClickGugun"
        defaultText="구/군"
      />
      <Dropdown
        class="dropdown"
        :items="dongData"
        id="dong"
        @click-item="onClickDong"
        defaultText="읍/면/동"
      />
      <button type="button" id="search" class="btn btn-primary">검색</button>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  margin-right: 10px;
}

#search {
  height: 38px;
}
</style>
