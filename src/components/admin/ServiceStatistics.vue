<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { ref, onMounted, computed, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { getMemberCount } from '@/api/admin/memberInfo.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const initialData = ref({
  labels: ref([]),
  datasets: [
    {
      label: '',
      data: ref([]),
      borderColor: '',
    },
  ],
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

// Reactive data properties
const previousMonthUsers = ref(0);
const currentMonthUsers = ref(0);
const userGrowth = ref(0);

// Computed properties for dynamic content
const growthText = computed(() => (userGrowth.value >= 0 ? '늘었네요' : '감소했네요'));
const imgSrc = computed(() =>
  userGrowth.value >= 0 ? '/src/assets/happy.png' : '/src/assets/sad.png'
);

// Fetch data from backend
const fetchData = async () => {
  try {
    const response = await getMemberCount(); // Adjust the endpoint as needed
    const stats = response.data.response;

    // Update the chart data and other properties
    const label = stats.map((stat) => stat.date);
    const data = stats.map((stat) => stat.memberStats);
    //
    previousMonthUsers.value = stats[stats.length - 2].memberStats;
    currentMonthUsers.value = stats[stats.length - 1].memberStats;
    userGrowth.value =
      ((currentMonthUsers.value - previousMonthUsers.value) / previousMonthUsers.value) * 100;

    initialData.value = {
      labels: label,
      datasets: [
        {
          label: '월별 이용자 수',
          data: data,
          backgroundColor: '#5A189A',
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call fetchData when the component is created
onMounted(fetchData);
</script>

<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-3 d-flex justify-content-center">
        <img :src="imgSrc" class="img-fluid rounded-start" />
      </div>
      <div class="col-md-9 d-flex">
        <div class="card-body d-flex flex-column justify-content-center">
          <p class="card-text">
            전월대비 이용자 수가 {{ userGrowth.toFixed(2) }}% {{ growthText }}
          </p>
          <p class="card-text">전월 이용자 수 : {{ previousMonthUsers }}명</p>
          <p class="card-text">이번 달 이용자 수 : {{ currentMonthUsers }}명</p>
        </div>
      </div>
    </div>
  </div>
  <br />
  <p class="month-member">월별 서비스 이용자 수</p>
  <div class="chart-container">
    <Bar :data="initialData" :options="options" />
  </div>
</template>

<style scoped>
.card {
  width: calc(100vw-250px);
  background-color: #3093ee;
  border-radius: 30px;
}
.card-body > p {
  font-size: 1.5em;
  color: white;
}
.img-fluid {
  margin-top: 10px;
  margin-bottom: 10px;
}

.month-member {
  font-size: 2em;
}
.chart-container {
  height: 400px; /* Adjust the height as needed */
}
</style>
