import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/main/MainView.vue';
import MypageView from '@/views/mypage/MypageView.vue';
import LoginView from '@/views/login/LoginView.vue';
import LoginProgressView from '@/views/login/LoginProgressView.vue';
import ApiDocsView from '@/views/apidocs/ApiDocsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainView,
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: MypageView,
    },
    {
      path: '/docs',
      name: 'ApiDocs',
      component: ApiDocsView,
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
      children: [
        {
          path: 'progress',
          name: 'LoginProgressView',
          component: LoginProgressView,
        },
      ],
    },
  ],
});

export default router;
