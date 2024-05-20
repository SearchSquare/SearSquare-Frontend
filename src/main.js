import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useKakao } from 'vue3-kakao-maps/@utils';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

useKakao(KAKAO_API_KEY);
const app = createApp(App);

app.component('infinite-loading', InfiniteLoading);
app.use(createPinia());
app.use(router);

app.mount('#app');
