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
import { onMounted, ref } from 'vue';
import { getMemberAge, getMemberGender } from '@/api/admin/memberInfo.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const genderData = ref({
  labels: ref([]),
  datasets: [
    {
      data: ref([]),
      backgroundColor: [],
    },
  ],
});

const ageData = ref({
  labels: ref([]),
  datasets: [
    {
      label: '',
      data: ref([]),
      backgroundColor: '',
    },
  ],
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const fetchData = async () => {
  try {
    const responseGender = await getMemberGender();
    const responseAge = await getMemberAge();

    const genderInfo = responseGender.data.response;
    const ageInfo = responseAge.data.response;
    const genderLabel = genderInfo.map((item) => item.gender);
    const genderDataMap = genderInfo.map((item) => item.memberStats);
    const ageLabel = ageInfo.map((item) => item.age);
    const ageDataMap = ageInfo.map((item) => item.memberStats);

    genderData.value = {
      labels: genderLabel,
      datasets: [
        {
          data: genderDataMap,
          backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        },
      ],
    };

    ageData.value = {
      labels: ageLabel,
      datasets: [
        {
          label: '연령대 별 이용자수',
          data: ageDataMap,
          backgroundColor: '#5A189A',
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchData);
</script>

<template>
  <p class="member-info">이용자 정보 통계</p>
  <div class="chart-container row">
    <div class="bar-chart col-3">
      <Doughnut :data="genderData" :options="options" />
    </div>
    <div class="doughnut-chart col-9">
      <Bar :data="ageData" :options="options" />
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
