<script setup>
import Map from '@/components/common/Map.vue';
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5 left-column">
        <h2>아파트를 검색해 보세요!</h2>
        <p>1248 results</p>
        <!-- <SelectBox /> -->
        <img src="/src/assets/main_picture.gif" class="responsive-image" />
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
