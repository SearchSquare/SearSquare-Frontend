import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/main/MainView.vue';
import MypageView from '@/views/mypage/MypageView.vue';
import LoginView from '@/views/login/LoginView.vue';
import ApiDocsView from '@/views/apidocs/ApiDocsView.vue';
import { storeToRefs } from 'pinia';
import { useMemberStore } from '@/stores/member.js';
import AdminView from '@/views/admin/AdminView.vue';
import ServiceStatistics from '@/components/admin/ServiceStatistics.vue';
import MemberManagement from '@/components/admin/MemberManagement.vue';

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
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      children: [
        {
          path: 'servicestatistics',
          name: 'ServiceStatistics',
          component: ServiceStatistics,
        },
        {
          path: 'membermanagement',
          name: 'MemberManagement',
          component: MemberManagement,
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  const memberStore = useMemberStore();
  const { isLogin } = storeToRefs(memberStore);
  console.log('isLogin=', isLogin.value && isLogin.value);
  if (sessionStorage.getItem('accessToken') == null && isLogin.value) {
    isLogin.value = false;
    return { name: 'Login' };
  }
  if (to.name === 'Login' && isLogin.value) {
    return { name: 'Main' };
  }
});

export default router;
