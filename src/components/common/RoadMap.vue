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
let circle;

// 사용자 정의 마커 이미지
const markerImageUrl = '/src/assets/marker.png'; // 마커 이미지 URL
const markerImageSize = new kakao.maps.Size(48, 48); // 마커 이미지 크기
const markerImageOption = { offset: new kakao.maps.Point(24, 48) }; // 마커 이미지 옵션(기준점)

// 카카오맵을 초기화하는 함수
const initializeMap = () => {
  const position = new kakao.maps.LatLng(props.lat, props.lng);
  const mapOptions = {
    center: position,
    level: 3,
  };

  map = new kakao.maps.Map(mapContainer.value, mapOptions);

  const markerImage = new kakao.maps.MarkerImage(
    markerImageUrl,
    markerImageSize,
    markerImageOption
  );

  marker = new kakao.maps.Marker({
    position,
    map,
    image: markerImage, // 사용자 정의 마커 이미지를 설정합니다
  });

  // 지도에 표시할 원을 생성합니다
  circle = new kakao.maps.Circle({
    center: position, // 원의 중심좌표
    radius: 250, // 미터 단위의 원의 반지름
    strokeWeight: 3, // 선의 두께
    strokeColor: '#C77DFF', // 선의 색깔
    strokeOpacity: 1, // 선의 불투명도 (0에서 1 사이)
    strokeStyle: 'line', // 선의 스타일
    fillColor: '#E0AAFF', // 채우기 색깔
    fillOpacity: 0.3, // 채우기 불투명도 (0에서 1 사이)
  });

  // 지도에 원을 표시합니다
  circle.setMap(map);

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
    if (map && marker && roadview && roadviewClient && circle) {
      const position = new kakao.maps.LatLng(props.lat, props.lng);
      map.setCenter(position);
      marker.setPosition(position);
      circle.setPosition(position); // 원의 중심 좌표를 업데이트합니다
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
