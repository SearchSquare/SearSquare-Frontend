<script setup>
import Map from '@/components/common/Map.vue';
import SelectBox from '@/components/main/SelectBox.vue';
import HouseCard from '@/components/main/HouseCard.vue';

import { ref } from 'vue';

const searchResults = ref([]);

const handleSearch = (data) => {
  searchResults.value = data;
};
</script>

<template>
  <div class="container">
    <div class="row map">
      <div class="col-md-5 left-column">
        <h2>아파트를 검색해 보세요!</h2>
        <p>1248 results</p>
        <SelectBox @search-house="handleSearch" />
        <img
          v-show="searchResults.length == 0"
          src="/src/assets/main_picture.gif"
          class="responsive-image"
        />
        <div v-show="searchResults">
          <HouseCard v-for="house in searchResults.value" :key="house" />
        </div>
      </div>
      <div class="col-md-7 right-column">
        <Map />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 120px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  height: 100vh;
}

.map {
  width: 100vw;
  height: 100%;
}

.left-column {
  text-align: left; /* 왼쪽 정렬 */
}

.right-column {
  text-align: right; /* 오른쪽 정렬 */
}

.responsive-image {
  max-width: 80%;
  height: auto;
}
</style>
