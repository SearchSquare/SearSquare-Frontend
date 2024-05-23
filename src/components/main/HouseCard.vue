<script setup>
import Price from '@/components/common/Price.vue';

const props = defineProps({
  house: Object,
});

const {
  aptId,
  name,
  lat,
  lng,
  builtYear,
  jibun,
  isPopular,
  address: { sido, gugun, dong, dongCode },
  price: { maxPrice, minPrice },
} = props.house;

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.house.lat, props.house.lng);
};
</script>

<template>
  <div
    :class="{
      'house-card col card my-2': isPopular,
      'house-card-default col card my-2': !isPopular,
    }"
    @click="handleClick"
  >
    <span>
      <div class="card-body d-flex">
        <div class="col-4 align-items-center">
          <h5 class="card-title">{{ name }}</h5>
          <p class="card-text">
            {{ sido }} {{ gugun }}
            {{ dong }}
            {{ jibun }}
          </p>
        </div>
        <div class="col-8 d-flex justify-content-evenly align-items-center">
          <Price :price="maxPrice" label="최고가" />
          <Price :price="minPrice" label="최저가" />
        </div>
      </div>
    </span>
  </div>
</template>

<style scoped>
.house-card,
.house-card-default {
  display: block;
  cursor: pointer;
  color: black;
  margin: 0 auto;
  position: relative;
  text-decoration: none;
  font-weight: 60;
  border-radius: 10px;
  overflow: hidden;
  padding: 5px;
  isolation: isolate;
}

.house-card:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 400%;
  height: 100%;
  background: linear-gradient(115deg, blue, pink, black);
  animation: an-at-keyframe-css-at-rule-that-translates-via-the-transform-property-the-background-by-negative-25-percent-of-its-width-so-that-it-gives-a-nice-border-animation_-We-use-the-translate-property-to-have-a-nice-transition-so-it_s-not-a-jerk-of-a-start-or-stop
    0.75s linear infinite;
  animation-play-state: running;
  translate: -5% 0%;
  transition: translate 1s ease-out;
}

.house-card:hover::before {
  animation-play-state: running;
  transition-duration: 1s;
  translate: 0% 0%;
}

@keyframes an-at-keyframe-css-at-rule-that-translates-via-the-transform-property-the-background-by-negative-25-percent-of-its-width-so-that-it-gives-a-nice-border-animation_-We-use-the-translate-property-to-have-a-nice-transition-so-it_s-not-a-jerk-of-a-start-or-stop {
  to {
    transform: translateX(-25%);
  }
}

.house-card span {
  position: relative;
  display: block;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  background: white;
  border-radius: 10px;
  height: 100%;
}

.card-title {
  font-weight: bold;
}
.card-text {
  font-size: 12px;
}
</style>
