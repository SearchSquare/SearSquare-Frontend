<script setup lang="ts">
import { defineProps, ref, computed, watch, defineExpose } from 'vue';
import {
  KakaoMap,
  KakaoMapMarker,
  type KakaoMapMarkerListItem,
} from 'vue3-kakao-maps';

const props = defineProps<{
  aptList: Array<{
    aptId: number;
    name: String;
    lat: number;
    lng: number;
  }>;
}>();

const markerInfoList = computed<KakaoMapMarkerListItem[]>(() =>
  props.aptList.map((apt) => ({
    id: apt.aptId,
    lat: apt.lat,
    lng: apt.lng,
    name: apt.name,
  }))
);

// State for map center
const mapCenter = ref({ lat: 37.5665, lng: 126.978 }); // Default coordinates (e.g., Seoul, South Korea)

watch(markerInfoList, (newList) => {
  if (newList.length > 0) {
    mapCenter.value = { lat: newList[0].lat, lng: newList[0].lng };
  }
});

const updateMapCenter = (lat: number, lng: number) => {
  mapCenter.value = { lat, lng };
};

// Expose updateMapCenter to be accessible from the parent component
defineExpose({ updateMapCenter });
</script>

<template>
  <KakaoMap
    style="width: 100vh; height: calc(100vh - 66px)"
    :lat="mapCenter.lat"
    :lng="mapCenter.lng"
  >
    <KakaoMapMarker
      v-for="marker in markerInfoList"
      :key="marker.id"
      :lat="marker.lat"
      :lng="marker.lng"
    />
  </KakaoMap>
</template>

<style scoped></style>
