import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  routes: [
    {
      path: '/',
      component: '@/main',
      routes: [
        { path: '/login', component: '@/pages/login' },
        {
          path: '/main',
          component: '@/views/Layout/index',
          routes: [
            { path: 'task', component: '@/pages/task/index' },
            { path: 'user', component: '@/pages/user/index' },
            {
              path: 'sub',
              component: '@/views/subLayout/index',
              routes: [
                { path: 'userChange', component: '@/pages/user/pages/userChange', title: '用户信息' },
                { path: 'modifyPassword', component: '@/pages/user/pages/resetPassword', title: '修改密码' },
                { path: 'aboutUs', component: '@/pages/user/pages/aboutUs', title: '关于我们' },
              ],
            },
            { path: 'bill', component: '@/pages/bill/index' },

            { path: '*', component: '@/pages/404' },
          ],
        },
      ],
    },
  ],
});
