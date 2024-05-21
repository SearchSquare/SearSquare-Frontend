<script setup>
import { ref, nextTick } from 'vue';
import Map from '@/components/common/Map.vue';
import SelectBox from '@/components/main/SelectBox.vue';
import HouseCard from '@/components/main/HouseCard.vue';
import HouseDetail from '@/components/main/HouseDetail.vue';
import { getFirstAptInfo, getReloadAptInfo } from '@/api/house/GetRegion';
import { getFirstHouseDeal, getSecondHouseDeal } from '@/api/house/GetHouse';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

const aptList = ref([]); // 전체 검색 결과 저장
const dongCode = ref('');
const lastAptId = ref(null);
const mapRef = ref(null);
const infiniteLoadingKey = ref(Date.now());
const selectedHouse = ref(null);
const isHouseDetailVisible = ref(false);
const firstHouseDeal = ref([]);

const handleSearch = async (data) => {
  dongCode.value = data;

  infiniteLoadingKey.value = Date.now();

  try {
    const response = await getFirstAptInfo(dongCode.value);
    aptList.value = response.data.response; // 데이터를 aptList에 할당
    if (aptList.value.length > 0) {
      lastAptId.value = aptList.value[aptList.value.length - 1].aptId;
      console.log(lastAptId.value);
    }
  } catch (error) {
    console.error('Failed to fetch apartment information:', error);
  }
};

const load = async ($state) => {
  try {
    const response = await getReloadAptInfo(dongCode.value, lastAptId.value);
    const newResults = response.data.response;
    console.log('마지막 id ', newResults[newResults.length - 1].aptId);
    console.log('목록 ', aptList.value);
    if (newResults.length) {
      aptList.value.push(...newResults);
      lastAptId.value = newResults[newResults.length - 1].aptId;
      newResults.length < 10 ? $state.complete() : $state.loaded();
    } else {
      $state.complete();
    }
    console.log('최종 id ', lastAptId.value);
  } catch (error) {
    // $state.error();
    $state.complete();
  }
};

const handleHouseCardClick = async (house) => {
  selectedHouse.value = house;
  isHouseDetailVisible.value = false; // Offcanvas 초기화
  nextTick(() => {
    isHouseDetailVisible.value = true; // Offcanvas 표시
  });
  mapRef.value.updateMapCenter(house.lat, house.lng);
  try {
    const response = await getFirstHouseDeal(selectedHouse.value.aptId);
    firstHouseDeal.value = response.data.response;
  } catch (error) {
    console.error('Failed to fetch apartment information:', error);
  }
};
</script>

<template>
  <div class="container">
    <div class="row map">
      <div class="col-4 left-column">
        <div>
          <h2>아파트를 검색해 보세요!</h2>
        </div>
        <SelectBox @search-house="handleSearch" />
        <img
          v-show="aptList.length === 0"
          src="/src/assets/main_picture.gif"
          class="responsive-image"
        />
        <div v-show="aptList.length" class="scrollable-container">
          <HouseCard
            v-for="house in aptList"
            :key="house.aptId"
            :house="house"
            @click="handleHouseCardClick(house)"
          />
          <InfiniteLoading :identifier="infiniteLoadingKey" @infinite="load" />
        </div>
      </div>
      <div class="col-8 right-column">
        <HouseDetail
          :house="selectedHouse"
          :housedeal="firstHouseDeal"
          :show="isHouseDetailVisible"
        />
        <Map ref="mapRef" :aptList="aptList" :selectedHouse="selectedHouse" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 66px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
}

.map {
  width: 100vw;
}

.left-column {
  text-align: left; /* 왼쪽 정렬 */
  z-index: 10;
  background-color: white;
  transition: transform 0.5s ease-in-out;
}

.right-column {
  text-align: right; /* 오른쪽 정렬 */
  position: relative;
}

.responsive-image {
  max-width: 80%;
  height: auto;
}

.scrollable-container {
  height: calc(100vh - 156.39px);
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
