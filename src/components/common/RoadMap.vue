<template>
  <div id="container" :class="showRoadview ? 'view_roadview' : 'view_map'">
    <div id="mapWrapper" class="wrapper">
      <div id="map" ref="mapContainer"></div>
      <input
        type="button"
        id="btnRoadview"
        @click="toggleMap(false)"
        title="로드뷰 보기"
        value="로드뷰"
      />
    </div>
    <div id="rvWrapper" class="wrapper">
      <div id="roadview" ref="roadviewContainer"></div>
      <input type="button" id="btnMap" @click="toggleMap(true)" title="지도 보기" value="지도" />
      <p v-if="!hasValidPanoId" class="no-roadview">No Roadview available for this location.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const props = defineProps({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

// 지도와 로드뷰를 참조할 변수
const mapContainer = ref(null);
const roadviewContainer = ref(null);
const showRoadview = ref(false);
const hasValidPanoId = ref(true);
let map;
let roadview;
let roadviewClient;
let marker;

// 카카오맵을 초기화하는 함수
const initializeMap = () => {
  const position = new kakao.maps.LatLng(props.lat, props.lng);
  const mapOptions = {
    center: position,
    level: 3,
  };

  map = new kakao.maps.Map(mapContainer.value, mapOptions);

  marker = new kakao.maps.Marker({
    position,
    map,
  });

  roadview = new kakao.maps.Roadview(roadviewContainer.value);
  roadviewClient = new kakao.maps.RoadviewClient();

  roadviewClient.getNearestPanoId(position, 50, function (panoId) {
    if (panoId) {
      roadview.setPanoId(panoId, position);
      hasValidPanoId.value = true;
    } else {
      hasValidPanoId.value = false;
    }
  });

  kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    const latlng = mouseEvent.latLng;
    roadviewClient.getNearestPanoId(latlng, 50, function (panoId) {
      if (panoId) {
        roadview.setPanoId(panoId, latlng);
        hasValidPanoId.value = true;
      } else {
        hasValidPanoId.value = false;
      }
    });
  });
};

// 지도를 토글하는 함수
const toggleMap = (active) => {
  showRoadview.value = !active;
};

onMounted(() => {
  const script = document.createElement('script');
  script.onload = () => kakao.maps.load(initializeMap);
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
  document.head.appendChild(script);
});

watch(
  () => [props.lat, props.lng],
  () => {
    if (map && marker && roadview && roadviewClient) {
      const position = new kakao.maps.LatLng(props.lat, props.lng);
      map.setCenter(position);
      marker.setPosition(position);
      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        if (panoId) {
          roadview.setPanoId(panoId, position);
          hasValidPanoId.value = true;
        } else {
          hasValidPanoId.value = false;
        }
      });
    }
  }
);
</script>

<style scoped>
#container {
  position: relative;
  width: 100%;
  height: 400px;
}

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#map,
#roadview {
  width: 100%;
  height: 100%;
}

#btnRoadview,
#btnMap {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 7px 12px;
  font-size: 14px;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  z-index: 1;
  cursor: pointer;
}

#btnRoadview:hover,
#btnMap:hover {
  background-color: #fcfcfc;
  border: 1px solid #c1c1c1;
}

.no-roadview {
  text-align: center;
  margin-top: 10px;
  color: red;
}

#container.view_map #rvWrapper {
  z-index: 0;
  display: none;
}

#container.view_roadview #mapWrapper {
  z-index: 0;
  display: none;
}
</style>
