<template>
  <div id="region-filter">
    <div class="input-group mb-3">
      <Dropdown :items="sidoData" id="sido" @clickItem="onClickSido" defaultText="시/도" />
      <Dropdown :items="gugunData" id="gugun" @clickItem="onClickGugun" defaultText="구/군" />
      <Dropdown :items="dongData" id="dong" @clickItem="onClickDong" defaultText="동" />
      <button type="button" class="btn btn-primary rounded-pill">검색</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Dropdown from './Dropdown.vue'; // Assume you have a Dropdown component
import { getSidoNames, getGugunNames, getDongNames } from '/src/assets/map-util.js';

export default {
  components: {
    Dropdown,
  },
  setup() {
    const sidoData = ref([]);
    const gugunData = ref([]);
    const dongData = ref([]);
    const sidoName = ref(null);
    const gugunName = ref(null);
    const dongName = ref(null);
    const map = ref(null);
    const star = ref(null);

    onMounted(() => {
      getSidoNames().then((json) => (sidoData.value = json));
      map.value = document.querySelector('kakao-map');
      star.value = document.querySelector('star-elem');
    });

    const onClickItem = (item) => {
      // handle year selection
    };

    const onClickSido = async (item) => {
      sidoName.value = item[0];
      gugunData.value = await getGugunNames(sidoName.value);
    };

    const onClickGugun = async (item) => {
      gugunName.value = item[0];
      dongData.value = await getDongNames(sidoName.value, gugunName.value);
    };

    const onClickDong = (item) => {
      dongName.value = item[0];
      // handle dong selection
    };

    return {
      sidoData,
      gugunData,
      dongData,
      onClickSido,
      onClickGugun,
      onClickDong,
      onClickItem,
    };
  },
};
</script>

<style scoped>
.input-group > .btn {
  margin-left: 10px; /* Adjust the margin as needed */
}
</style>
