<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'vue-chartjs';
import * as barChartConfig from '@/assets/member.ts';
import * as doughnutChartConfig from '@/assets/memberGender.ts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const barData = barChartConfig.data;
const barOptions = barChartConfig.options;

const doughnutData = doughnutChartConfig.data;
const doughnutOptions = doughnutChartConfig.options;
</script>

<template>
  <p class="member-info">이용자 정보 통계</p>
  <div class="chart-container row">
    <div class="bar-chart col-3">
      <Doughnut :data="doughnutData" :options="doughnutOptions" />
    </div>
    <div class="doughnut-chart col-9">
      <Bar :data="barData" :options="barOptions" />
    </div>
  </div>
  <br />
  <div class="member-management">
    <p class="member-manage-name">회원 관리</p>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            쁘띠종한
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <strong>This is the third item's accordion body.</strong> It is hidden by default, until
            the collapse plugin adds the appropriate classes that we use to style each element.
            These classes control the overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or overriding our default
            variables. It's also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>
      </div>
    </div>
    <button class="plusbutton" @click="loadMoreDeals">더보기</button>
  </div>
</template>

<style scoped>
.member-info,
.member-manage-name {
  font-size: 1.8em;
}

.plusbutton {
  border: 1px #a39485 solid;
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

.member-management {
  width: 50vw;
}
</style>
