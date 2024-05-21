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
import { Bar } from 'vue-chartjs';
import * as chartConfig from '@/assets/member.ts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = chartConfig.data;
const options = chartConfig.options;
</script>

<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-3 d-flex justify-content-center">
        <img src="/src/assets/happy.png" class="img-fluid rounded-start" />
      </div>
      <div class="col-md-9 d-flex">
        <div class="card-body d-flex flex-column justify-content-center">
          <p class="card-text">전월대비 이용자 수가 X% 늘었네요</p>
          <p class="card-text">전월 이용자 수 : A명</p>
          <p class="card-text">이번 달 이용자 수 : B명</p>
        </div>
      </div>
    </div>
  </div>
  <br />
  <p class="month-member">월별 서비스 이용자 수</p>
  <div class="chart-container">
    <Bar :data="data" :options="options" />
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
</style>
