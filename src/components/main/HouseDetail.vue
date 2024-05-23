<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { Offcanvas } from 'bootstrap';
import Price from '@/components/common/Price.vue';
import RoadMap from '@/components/common/RoadMap.vue';
import HouseChart from '@/components/main/HouseChart.vue';
import { getSecondHouseDeal } from '@/api/house/GetHouse';
import { getGpt } from '@/api/house/GptApi.js'; // Adjust the import path as necessary
import { getAroundPriceListApi } from '@/api/house/house.js';

const answer = ref(null);
const targetApt = ref(null);
const aroundApt = ref(null);
const isButtonDisabled = ref(false);

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
  return `${billion ? `${billion}억` : ''} ${million ? `${million}천만원` : '원'}`;
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
  async (newVal) => {
    if (newVal) {
      await nextTick(); // DOM이 업데이트된 후에 실행
      if (offcanvasInstance) {
        offcanvasInstance.dispose();
      }
      offcanvasInstance = new Offcanvas(offcanvas.value, { backdrop: false });
      offcanvasInstance.show();
    }
  }
);

onMounted(async () => {
  await nextTick(); // DOM이 업데이트된 후에 실행
  offcanvasInstance = new Offcanvas(offcanvas.value, { backdrop: false });
});

const housedeal = ref(props.housedeal);
let lastHouseDealId = ref(
  housedeal.value.length ? housedeal.value[housedeal.value.length - 1].houseDealId : null
);

watch(
  () => props.housedeal,
  (newVal) => {
    housedeal.value = newVal;
    lastHouseDealId.value = newVal.length ? newVal[newVal.length - 1].houseDealId : null;
    isButtonDisabled.value = newVal.length === 0; // Disable button if housedeal is empty
  },
  { immediate: true }
);

const loadMoreDeals = async () => {
  try {
    const response = await getSecondHouseDeal(props.house.aptId, lastHouseDealId.value);
    const newResults = response.data.response;
    if (newResults.length) {
      housedeal.value.push(...newResults);
      lastHouseDealId.value = newResults[newResults.length - 1].houseDealId;
    }
  } catch (error) {
    console.error('Error loading more deals:', error);
  }
};

const gptClicked = async () => {
  const message = ref([
    {
      role: 'system',
      content: '당신은 부동산 전문가입니다.',
    },
    {
      role: 'user',
      content: `이것은 target에 대한 정보입니다.${targetApt.value} 그리고 이것은 around의 대한 데이터입니다.${aroundApt.value} 제공되는 데이터를 설명하면 target은 현재 사용자가 조회하고 있는 아파트의 거래 날짜와 당시 거래된 집의 평균 가격이 저장되어 있습니다. around는 현재 사용자가 조회하고 있는 아파트를 기준으로 반경 500m 이내에서 거래되었던 정보가 저장되어 있습니다. 동일하게 거래 날짜와 그 날에 거래된 집의 평균 가격 정보입니다.두 배열을 분석하여 현재 조회하고 있는 아파트는 주변 시세와 비교할 때 어떤 양상을 보이고 있는지 정리하여 알려줘야 합니다. 반드시 300자 이내로 정리하여 응답해야 하며 한국말을 사용해야 합니다. 또한 target은 ${props.house.name}이며 around는 주변아파트 입니다. 이 내용을 답변을 할때 적용해야 합니다.`,
    },
  ]);

  const cond = {
    houseId: props.house.aptId,
    lat: props.house.lat,
    lng: props.house.lng,
    dongCode: props.house.address.dongCode,
    radius: 500,
  };

  try {
    const jsonData = await getAroundPriceListApi(cond);
    targetApt.value = jsonData.data.response.target;
    aroundApt.value = jsonData.data.response.around;
    const response = await getGpt(message.value);
    answer.value = response.data.choices[0].message.content;
    isButtonDisabled.value = true; // Disable button after clicking
  } catch (error) {
    console.error('Error:', error);
  }
};

const resetAnswer = () => {
  answer.value = null;
  isButtonDisabled.value = housedeal.value.length === 0; // Reset button state based on housedeal
};

watch(
  () => props.house,
  () => {
    resetAnswer();
  }
);
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
          <div class="col-4 d-flex flex-column justify-content-evenly align-items-center priceinfo">
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
      <br />
      <!-- 거래 내역 테이블 -->
      <div class="chat-card">
        <div class="chat-header">
          <div class="h2">AI에게 물어보세요!</div>
        </div>
        <div class="chat-body">
          <div class="message outgoing" v-if="housedeal.length > 0">
            <p>주변 아파트와 비교하여 간단히 요약 해줘😘</p>
          </div>

          <div class="message outgoing" v-else>
            <p>거래내역이 없어요!</p>
          </div>
          <div class="message incoming" v-if="answer">
            <p>{{ answer }}</p>
          </div>
        </div>
        <div class="chat-footer">
          <button @click="gptClicked" :disabled="isButtonDisabled || housedeal.length === 0">
            답변보기
          </button>
        </div>
      </div>
      <br />

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

.chat-card {
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-header {
  padding: 10px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
}

.chat-header .h2 {
  font-size: 16px;
  color: #333;
}

.chat-body {
  padding: 20px;
  display: grid;
  flex-direction: column;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  max-width: 70%;
}

.incoming {
  color: white;
  background-color: #71717a;
  text-align: left;
  justify-self: start;
}

.outgoing {
  background-color: #42c55e;
  text-align: left;
  justify-self: end;
}

.message p {
  font-size: 14px;
  color: white;
  margin: 0;
}

.chat-footer {
  padding: 10px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: right;
}

.chat-footer button {
  padding: 5px 10px;
  border: none;
  background-color: #4285f4;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.chat-footer button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.chat-footer button:hover:enabled {
  background-color: #0f9d58;
}

@keyframes chatAnimation {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-card .message {
  animation: chatAnimation 0.3s ease-in-out;
  animation-fill-mode: both;
  animation-delay: 0.1s;
}

.chat-card .message:nth-child(even) {
  animation-delay: 0.2s;
}

.chat-card .message:nth-child(odd) {
  animation-delay: 0.3s;
}
</style>
