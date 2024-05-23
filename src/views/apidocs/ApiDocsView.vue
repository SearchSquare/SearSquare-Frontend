<script setup>
import { getServiceKey, getAroundPrice } from '@/api/apidocs/Apidocs.js';
import { ref } from 'vue';

const key = ref(null);
const createdAt = ref(null);
const targetYear = ref(null);
const targetAvgPrice = ref(null);
const aroundYear = ref(null);
const aroundAvgPrice = ref(null);

const fetchData = async () => {
  try {
    const response = await getServiceKey(); // Adjust the endpoint as needed
    const data = response.data.response;
    key.value = data.serviceKey;
    createdAt.value = data.createdAt;
    console.log(serviceKey);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// const getAroundPrice = async () => {
//   try {
//     const response = await getAroundPrice(); // Adjust the endpoint as needed
//     const data = response.data.response;
//     targetYear.value = data.target.year;
//     targetAvgPrice.value = data.target.avgPrice;
//     aroundYear.value = data.around.year;
//     aroundAvgPrice.value = data.around.avgPrice;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };
</script>

<template>
  <div class="container">
    <div class="member-token">
      <h2>홍길동님, 반갑습니다.</h2>
      <table class="main-table">
        <colgroup>
          <col style="width: 66.67%" />
          <col style="width: 33.33%" />
        </colgroup>
        <thead>
          <tr>
            <th>인증키</th>
            <th>발급일자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ key }}</td>
            <td>{{ createdAt }}</td>
          </tr>
        </tbody>
      </table>
      <button class="copy-button" @click="fetchData">인증키 복사</button>
    </div>

    <div class="service-info">
      <h2>서비스 정보</h2>
      <table class="info-table">
        <thead>
          <tr>
            <th>데이터포맷</th>
            <th>End Point</th>
            <th>인증키</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>JSON</td>
            <td>https://www.naver.com</td>
            <td>{{ key }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="api-info">
      <table class="api-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>설명</th>
            <th>일일 트래픽</th>
            <th>미리보기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>반경 500M내의 아파트 평균 거래가 조회</td>
            <td>100</td>
            <td><button class="preview-button">확인</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.member-token {
  margin-top: 90px;
}
.container {
  margin-left: 5%;
}

.main-table,
.info-table,
.api-table {
  width: 50%;
  border-collapse: collapse;
  margin-top: 10px;
}

.main-table th,
.main-table td,
.info-table th,
.info-table td,
.api-table th,
.api-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.main-table th,
.info-table th,
.api-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.copy-button {
  margin-top: 10px;
  background-color: #f48fb1;
  border: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
}

.service-info {
  margin-top: 50px;
}

.api-info {
  margin-top: 50px;
}

.preview-button {
  background-color: #d1c4e9;
  border: none;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
}
</style>
