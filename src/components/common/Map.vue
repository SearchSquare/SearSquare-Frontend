<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { KakaoMap, KakaoMapMarker, type KakaoMapMarkerListItem } from 'vue3-kakao-maps';

const props = defineProps<{
  aptList: Array<{
    aptId: number;
    name: string;
    lat: number;
    lng: number;
  }>;
  selectedHouse: {
    aptId: number;
    name: string;
    lat: number;
    lng: number;
  } | null;
}>();

const markerInfoList = computed<KakaoMapMarkerListItem[]>(() =>
  props.aptList.map((apt) => ({
    id: apt.aptId,
    lat: apt.lat,
    lng: apt.lng,
    name: apt.name,
    visible: ref(false), // Add visibility state for each marker
  }))
);

// State for map center
const mapCenter = ref({ lat: 37.5665, lng: 126.978 }); // Default coordinates (e.g., Seoul, South Korea)

watch(
  () => props.selectedHouse,
  (newHouse) => {
    if (newHouse) {
      mapCenter.value = { lat: newHouse.lat, lng: newHouse.lng };
    }
  },
  { immediate: true }
);

watch(markerInfoList, (newList) => {
  if (newList.length > 0 && !props.selectedHouse) {
    mapCenter.value = { lat: newList[0].lat, lng: newList[0].lng };
  }
});

const updateMapCenter = (lat: number, lng: number) => {
  mapCenter.value = { lat, lng };
};

// Expose updateMapCenter to be accessible from the parent component
defineExpose({ updateMapCenter });

// Event handlers for marker infoWindow
const mouseOverKakaoMapMarker = (marker: KakaoMapMarkerListItem) => {
  marker.visible.value = true;
};

const mouseOutKakaoMapMarker = (marker: KakaoMapMarkerListItem) => {
  marker.visible.value = false;
};
</script>

<template>
  <KakaoMap
    style="width: calc(100vw -764px); height: calc(100vh - 66px)"
    :lat="mapCenter.lat"
    :lng="mapCenter.lng"
  >
    <KakaoMapMarker
      v-for="marker in markerInfoList"
      :key="marker.id"
      :lat="marker.lat"
      :lng="marker.lng"
      :clickable="true"
      :infoWindow="{ content: marker.name, visible: marker.visible.value }"
      @mouseOverKakaoMapMarker="() => mouseOverKakaoMapMarker(marker)"
      @mouseOutKakaoMapMarker="() => mouseOutKakaoMapMarker(marker)"
      :image="{
        imageSrc: '/src/assets/marker.png',
        imageWidth: 48,
        imageHeight: 48,
        imageOption: {},
      }"
    />
  </KakaoMap>
</template>

<style scoped></style>
