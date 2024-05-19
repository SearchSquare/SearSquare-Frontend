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
const mapRef = ref(null);

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

const handleHouseCardClick = (lat, lng) => {
  mapRef.value.updateMapCenter(lat, lng);
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
          <HouseCard
            v-for="house in aptList"
            :key="house.aptId"
            :house="house"
            @click="handleHouseCardClick(house.lat, house.lng)"
          />
          <InfiniteLoading @infinite="load" />
        </div>
      </div>
      <div class="col-md-7 right-column">
        <Map ref="mapRef" :aptList="aptList" />
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
  height: calc(100vh - 120px);
}

.map {
  width: 100vw;
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

/* Webkit 기반 브라우저 (Chrome, Safari 등) */
.scrollable-container::-webkit-scrollbar {
  width: 12px; /* 스크롤바의 너비 */
}

.scrollable-container::-webkit-scrollbar-thumb {
  background-color: #888; /* 스크롤바 손잡이 색상 */
  border-radius: 10px; /* 손잡이의 둥근 모서리 */
  border: 3px solid transparent; /* 스크롤바 손잡이의 여백 */
  background-clip: content-box; /* 손잡이의 배경 클립 */
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 손잡이 호버 시 색상 */
}

.scrollable-container::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 스크롤바 트랙 색상 */
  border-radius: 10px; /* 트랙의 둥근 모서리 */
  margin: 10px 0; /* 트랙의 위, 아래 여백 */
}

.scrollable-container::-webkit-scrollbar-corner {
  background-color: transparent; /* 스크롤바 코너의 색상 */
}
</style>
