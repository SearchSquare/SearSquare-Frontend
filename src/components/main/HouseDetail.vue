<script setup>
import { ref, watch, onMounted } from 'vue';
import { Offcanvas } from 'bootstrap';
import Price from '@/components/common/Price.vue';
import RoadMap from '@/components/common/RoadMap.vue';
import HouseChart from '@/components/main/HouseChart.vue';
import { getSecondHouseDeal } from '@/api/house/GetHouse';

const props = defineProps({
  house: {
    type: Object,
    default: () => ({}),
  },
  housedeal: {
    type: Array,
    default: () => [],
  },
  show: Boolean,
});

const formatPrice = (price) => {
  const billion = Math.floor(price / 10000);
  const million = Math.floor((price % 10000) / 1000);
  if (price === 0) {
    return '거래없음';
  }
  return `${billion ? `${billion}억` : ''} ${
    million ? `${million}천만원` : '원'
  }`;
};

const formatArea = (area) => {
  const roundarea = Math.round(area * 100) / 100;
  return roundarea;
};

const formatTime = (dealDate) => {
  const dateOnly = dealDate.split(' ')[0];
  return dateOnly;
};

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

const housedeal = ref(props.housedeal);
let lastHouseDealId = ref(
  housedeal.value.length
    ? housedeal.value[housedeal.value.length - 1].houseDealId
    : null
);

watch(
  () => props.housedeal,
  (newVal) => {
    housedeal.value = newVal;
    lastHouseDealId.value = newVal.length
      ? newVal[newVal.length - 1].houseDealId
      : null;
  },
  { immediate: true }
);

const loadMoreDeals = async () => {
  try {
    const response = await getSecondHouseDeal(
      props.house.aptId,
      lastHouseDealId.value
    );
    const newResults = response.data.response;
    if (newResults.length) {
      housedeal.value.push(...newResults);
      lastHouseDealId.value = newResults[newResults.length - 1].houseDealId;
    }
  } catch (error) {
    console.error('Error loading more deals:', error);
  }
};
</script>

<template>
  <div
    class="offcanvas offcanvas-center"
    tabindex="-1"
    ref="offcanvas"
    aria-labelledby="houseDetailSidebarLabel"
  >
    <div class="offcanvas-header" v-if="house">
      <h5 class="offcanvas-title" id="houseDetailSidebarLabel">
        {{ house.name }}
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body scrollable-container" v-if="house">
      <!-- 집 상세 정보 -->
      <div class="card">
        <div class="card-body d-flex">
          <div class="col-8 align-items-center info">
            <p class="card-text">
              {{ house.address.sido }} {{ house.address.gugun }}
              {{ house.address.dong }}
              {{ house.jibun }}
            </p>
            <p>건축년도: {{ house.builtYear }}</p>
          </div>
          <div
            class="col-4 d-flex flex-column justify-content-evenly align-items-center priceinfo"
          >
            <Price :price="house.price.maxPrice" label="최고가" />
            <Price :price="house.price.minPrice" label="최저가" />
          </div>
        </div>
      </div>
      <br />
      <!-- 지도 -->
      <RoadMap :lat="house.lat" :lng="house.lng" />
      <br />
      <!-- 연도별 가격 추세선 -->
      <HouseChart :house="props.house" />
      <!-- 거래 내역 테이블 -->
      <table>
        <thead>
          <tr>
            <th>거래일</th>
            <th>층</th>
            <th>면적</th>
            <th>가격</th>
            <th>판매자</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deal in housedeal" :key="deal.houseDealId">
            <td>{{ formatTime(deal.dealDate) }}</td>
            <td>{{ deal.floor }}</td>
            <td>{{ formatArea(deal.area) }}</td>
            <td>{{ formatPrice(deal.price) }}</td>
            <td>{{ deal.nickname }}</td>
          </tr>
        </tbody>
      </table>
      <button class="plusbutton" @click="loadMoreDeals">더보기</button>
    </div>
  </div>
</template>

<style scoped>
.offcanvas-center {
  width: 500px;
  height: 100%;
  transform: translate(-100%, 0%);
  position: absolute;
  z-index: 5;
}

.info {
  text-align: left;
}

.priceinfo {
  text-align: center;
}

table,
.plusbutton {
  border: 1px #a39485 solid;
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

thead {
  font-weight: bold;
  color: #fff;
  background: #73685d;
}

td,
th {
  padding: 1em 0.5em;
  vertical-align: middle;
  text-align: center;
}

td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
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
