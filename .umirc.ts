import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/index' },
    { path: '/canvas', component: '@/pages/canvas' },
    { path: '/scroll', component: '@/pages/scroll' },
    { path: '/scrollUi', component: '@/pages/scroll/scroll.tsx' },
    { path: '/todo', component: '@/pages/todoList' },
  ],
  fastRefresh: {},
});
