<script setup>
import { onMounted, ref, watch } from 'vue';
import { Line } from 'vue-chartjs';
import { getAroundPriceListApi } from '@/api/house/house.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// ChartJS 필요 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 차트 데이터 및 옵션을 설정
const chartData = ref({
  labels: ref([]),
  datasets: [
    {
      label: '',
      data: ref([]),
      fill: false,
      borderColor: '',
      tension: 0,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

// house 값이 전달될 때 api를 호출하여 차트에 데이터를 보여줍니다.
const props = defineProps({
  house: Object,
});

const getAroundPriceList = async (nowHouse) => {
  const cond = {
    houseId: nowHouse.aptId,
    lat: nowHouse.lat,
    lng: nowHouse.lng,
    dongCode: nowHouse.address.dongCode,
    radius: 500,
  };
  const response = await getAroundPriceListApi(cond);
  const targetYearList = response.data.response.target.map((item) => item.year);
  const targetAvgPriceList = response.data.response.target.map(
    (item) => item.avgPrice
  );
  const aroundYearList = response.data.response.around.map((item) => item.year);
  const aroundAvgPriceList = response.data.response.around.map(
    (item) => item.avgPrice
  );
  return {
    targetYearList,
    targetAvgPriceList,
    aroundYearList,
    aroundAvgPriceList,
  };
};

watch(
  () => props.house,
  async (newHouse, oldHouse) => {
    const {
      targetYearList,
      targetAvgPriceList,
      aroundYearList,
      aroundAvgPriceList,
    } = await getAroundPriceList(newHouse);
    // 차트 데이터 갱신
    chartData.value = {
      labels: targetYearList,
      datasets: [
        {
          label: '현재 아파트 평균 매매가',
          data: targetAvgPriceList,
          fill: false,
          borderColor: '#ff7900',
          tension: 0.1,
        },
        {
          label: '반경 500m 평균 매매가',
          data: aroundAvgPriceList,
          fill: false,
          borderColor: '#bfd7ea',
          tension: 0.1,
        },
      ],
    };
  },
  { immediate: true }
);
</script>

<template>
  <div class="house-chart">
    <Line :options="chartOptions" :data="chartData" />
  </div>
</template>

<style scoped>
.house-chart {
  height: 30%;
}
</style>
