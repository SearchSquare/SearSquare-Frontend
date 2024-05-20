import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/main/MainView.vue';
import MypageView from '@/views/mypage/MypageView.vue';
import LoginView from '@/views/login/LoginView.vue';
import ApiDocsView from '@/views/apidocs/ApiDocsView.vue';
import { useMemberStore } from '@/stores/member.js';
import { storeToRefs } from 'pinia';

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
    },
  ],
});

router.beforeEach((to, from, next) => {
  const memberStore = useMemberStore();
  const { isLogin } = storeToRefs(memberStore);
  // console.log(isLogin.value);
  console.log('to경로', to.path);
  console.log("to.path == '/login'", to.path == '/login');
  console.log('isLogin: ', isLogin.value);
  if (to.path == '/login' && isLogin.value) {
    console.log('이동 중 가드 만남');
    next({ name: 'Main' });
  } else {
    next();
  }
});

export default router;
