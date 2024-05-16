import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { KAKAO_API_KEY } from '@/assets/config.js';

import App from './App.vue';
import router from './router';
import { useKakao } from 'vue3-kakao-maps/@utils';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
useKakao(KAKAO_API_KEY);
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
