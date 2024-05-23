<script setup>
import { getServiceKey, getAroundPrice } from '@/api/apidocs/Apidocs.js';
import { ref, watch, onMounted } from 'vue';

const serviceKey = ref('');
const createdAt = ref('');
const targetYear = ref(null);
const targetAvgPrice = ref(null);
const aroundYear = ref(null);
const aroundAvgPrice = ref(null);

const fetchData = async () => {
  try {
    const response = await getServiceKey(); // Adjust the endpoint as needed
    const data = response.data.response;
    serviceKey.value = data.serviceKey;
    createdAt.value = data.createdAt;
    console.log(serviceKey);
  } catch (error) {
    serviceKey.value = '로그인 후 조회 가능합니다.';
    createdAt.value = '';
  }
};

const jsonData = ref({
  code: 'string',
  message: 'string',
  response: {
    target: [
      {
        year: 'string',
        avgPrice: 0,
      },
    ],
    around: [
      {
        year: 'string',
        avgPrice: 0,
      },
    ],
  },
  isSuccess: true,
});

const jsonResultData = ref({
  code: '2000',
  message: 'OK',
  response: {
    target: [
      {
        year: '2023-5',
        avgPrice: 156000,
      },
      {
        year: '2023-7',
        avgPrice: 86000,
      },
      {
        year: '2024-1',
        avgPrice: 93400.2,
      },
    ],
    around: [
      {
        year: '2023-5',
        avgPrice: 90000.5,
      },
      {
        year: '2023-7',
        avgPrice: 73000,
      },
      {
        year: '2024-1',
        avgPrice: 134400.3,
      },
    ],
  },
  isSuccess: true,
});

const scrollToBottom = () => {
  console.log('dd');
  window.scrollTo(0, document.body.scrollHeight);
};

const mockApiCall = () => {
  jsonData.value = jsonResultData.value;
  setTimeout(() => {
    scrollToBottom();
  }, 100);
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>서치스퀘어 오픈 API</h1>
    </header>
    <section class="api-intro">
      <h2>REST API</h2>
      <p>
        이 문서는 위/경도와 공공데이터 포털에서 제공되는 동 코드를 기반으로 평균
        매매가 조회 API 구현 방법을 소개합니다.
      </p>
    </section>
    <section class="api-intro">
      <h2>서비스 키 발급</h2>
      <p>API 요청 시 필요한 서비스 키는 로그인 후 자동으로 발급됩니다!</p>
      <table class="info-table">
        <thead>
          <tr>
            <th>보유중인 키</th>
            <th>발급 날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ serviceKey }}</td>
            <td>{{ createdAt }}</td>
          </tr>
        </tbody>
      </table>
      <br />
    </section>
    <section class="api-details">
      <h2>특정 아파트와 주변 아파트 월별 평균 매매가 조회</h2>
      <h4>기본 정보</h4>
      <table class="info-table">
        <thead>
          <tr>
            <th>메서드</th>
            <th>URL</th>
            <th>인증 방식</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GET</td>
            <td>https://searchsquare.com/api/v1/</td>
            <td>REST API 키</td>
          </tr>
        </tbody>
      </table>
      <br />
      <h4>요청</h4>
      <h5>헤더</h5>
      <table class="info-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>설명</th>
            <th>필수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Authorization</td>
            <td>Bearer {SERVICE_KEY}</td>
            <td>REST API 키</td>
          </tr>
        </tbody>
      </table>
      <br />
      <h5>쿼리 파라미터</h5>
      <table class="info-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>타입</th>
            <th>설명</th>
            <th>필수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>lat</td>
            <td>double</td>
            <td>위도</td>
            <td>O</td>
          </tr>
          <tr>
            <td>lng</td>
            <td>double</td>
            <td>경도</td>
            <td>O</td>
          </tr>
          <tr>
            <td>dong-code</td>
            <td>String</td>
            <td>동 코드 (공공데이터 포털 제공)</td>
            <td>O</td>
          </tr>
          <tr>
            <td>radius</td>
            <td>Integer</td>
            <td>반경</td>
            <td>O</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="api-details">
      <h4>응답</h4>
      <h5>본문</h5>
      <table class="info-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>타입</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>code</td>
            <td>String</td>
            <td>응답 관련 정보</td>
          </tr>
          <tr>
            <td>message</td>
            <td>String</td>
            <td>응답 상태</td>
          </tr>
          <tr>
            <td>response</td>
            <td>Object</td>
            <td>조회 결과</td>
          </tr>
          <tr>
            <td>response.target</td>
            <td>List</td>
            <td>기준이 되는 아파트 월별 평균 매매가</td>
          </tr>
          <tr>
            <td>response.target.year</td>
            <td>String</td>
            <td>매매 날짜</td>
          </tr>
          <tr>
            <td>response.target.avgPrice</td>
            <td>double</td>
            <td>평균 매매가</td>
          </tr>
          <tr>
            <td>response.around</td>
            <td>List</td>
            <td>주변 아파트 월별 평균 매매가</td>
          </tr>
          <tr>
            <td>response.around.year</td>
            <td>String</td>
            <td>매매 날짜</td>
          </tr>
          <tr>
            <td>response.around.avgPrice</td>
            <td>double</td>
            <td>평균 매매가</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
  <div class="json">
    <pre>{{ jsonData }}</pre>
    <div>
      <button
        @click="mockApiCall"
        type="button"
        class="btn btn-primary call-btn"
      >
        미리보기
      </button>
    </div>
  </div>
</template>

<style scoped>
.call-btn {
  width: 100%;
}

.container {
  width: 80%;
  margin-top: 66px;
  font-family: Arial, sans-serif;
  color: #333;
}

.header {
  background-color: #001f60;
  color: white;
  padding: 20px;
}

.api-intro {
  background-color: #f2f2f2;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
}

.api-intro h2 {
  margin-bottom: 10px;
}

.api-intro p {
  margin-bottom: 20px;
}

.api-details,
.api-spec {
  margin-top: 40px;
}

.api-details h2,
.api-details h3,
.api-details h4,
.api-spec h2,
.api-spec h3,
.api-spec h4 {
  margin-bottom: 10px;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  table-layout: fixed;
}

.info-table th,
.info-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  word-wrap: break-word;
}

.info-table th {
  background-color: #f2f2f2;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  table-layout: fixed;
}

.spec-table th,
.spec-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  word-wrap: break-word;
}

.spec-table th {
  background-color: #f2f2f2;
}

.json {
  width: 80%;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #282c34;
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Courier New', Courier, monospace;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
