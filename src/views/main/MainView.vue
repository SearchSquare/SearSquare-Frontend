<script setup>
import Map from '@/components/common/Map.vue';
import SelectBox from '@/components/main/SelectBox.vue';
import HouseCard from '@/components/main/HouseCard.vue';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

import { ref } from 'vue';

const aptList = ref([]); // 전체 검색 결과 저장
const dongCode = ref(null);
let lastAptId = null;

const handleSearch = (data) => {
  aptList.value = data.response.response;
  dongCode.value = data.dongCode;
  lastAptId = aptList.value.length ? aptList.value[aptList.value.length - 1].aptId : 0;
};

const load = async ($state) => {
  try {
    const response = await fetch(
      `http://localhost:8080/house/?dong-code=${dongCode.value}&size=10&last-house-id=${lastAptId}`
    );
    const json = await response.json();
    const newResults = json;
    if (json.response.length < 10) $state.complete();
    else {
      aptList.value.push(...json.response);
      $state.loaded();
    }
    lastAptId = newResults.response[newResults.response.length - 1].aptId;
  } catch (error) {
    $state.error();
  }
};
</script>

<template>
  <div class="container">
    <div class="row map">
      <div class="col-md-5 left-column">
        <h2>아파트를 검색해 보세요!</h2>
        <p>1248 results</p>
        <SelectBox @search-house="handleSearch" />
        <img
          v-show="aptList.length == 0"
          src="/src/assets/main_picture.gif"
          class="responsive-image"
        />
        <div v-show="aptList.length" class="scrollable-container">
          <HouseCard v-for="house in aptList" :key="house.aptId" :house="house" />
          <InfiniteLoading @infinite="load" />
        </div>
      </div>
      <div class="col-md-7 right-column">
        <Map />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 120px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  height: 100vh;
}

.map {
  width: 100vw;
  height: 100%;
}

.left-column {
  text-align: left; /* 왼쪽 정렬 */
}

.right-column {
  text-align: right; /* 오른쪽 정렬 */
}

.responsive-image {
  max-width: 80%;
  height: auto;
}

.scrollable-container {
  max-height: 70vh; /* Adjust based on your layout */
  overflow-y: auto;
  padding-right: 10px; /* Optional: for scrollbar spacing */
}
</style>
