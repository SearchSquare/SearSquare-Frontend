import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/main/MainView.vue';
import MypageView from '@/views/mypage/MypageView.vue';
import LoginView from '@/views/login/LoginView.vue';
import ApiDocsView from '@/views/apidocs/ApiDocsView.vue';
import { storeToRefs } from 'pinia';
import { useMemberStore } from '@/stores/member.js';

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
      name: 'Login',
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from) => {
  const memberStore = useMemberStore();
  const { isLogin } = storeToRefs(memberStore);
  if (to.name === 'Login' && isLogin.value) {
    return { name: 'Main' };
  }
});

export default router;
