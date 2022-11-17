import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  routes: [
    { path: '/login', component: '@/pages/home' },
    {
      path: '/',
      component: '@/views/Layout/index',
      routes: [
        { path: '/task', component: '@/pages/task/index' },
        { path: '/user', component: '@/pages/user/index' },
        {
          path: '/sub',
          component: '@/views/subLayout/index',
          routes: [
            { path: 'userChange', component: '@/pages/user/components/userChange', title: '用户信息' },
            { path: 'modifyPassword', component: '@/pages/user/components/resetPassword', title: '修改密码' },
          ],
        },
        // { path: '/', redirect: '/login' },
        // { path: '/login', component: '@/pages/home' },
        // { path: '/test', component: '@/components/verification/verification' },
        // { path: '/canvas', component: '@/pages/canvas' },
        // { path: '/scroll', component: '@/pages/scroll' },
        // { path: '/scrollUi', component: '@/pages/scroll/scroll.tsx' },
        // { path: '/todo', component: '@/pages/todoList' },
        // { path: '/loading', component: '@/pages/loading' },
        // { path: '/animation', component: '@/pages/animation' },
        // { path: '/card', component: '@/pages/card' },
        // { path: '/code', component: '@/pages/code' },
        // { path: '/code/animation', component: '@/pages/code/code.tsx' },
        // { path: '/message', component: '@/lib/message' },
        // { path: '/test', component: '@/lib/message/test/index.tsx' },
        // { path: '/testI18n', component: '@/pages/i18n/index.tsx' },
        // { path: '/theme', component: '@/pages/theme' },
        { path: '*', component: '@/pages/404' },
      ],
    },
    { path: '*', component: '@/pages/404' },
  ],
});
