import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/index' },
    { path: '/canvas', component: '@/pages/canvas' },
    { path: '/scroll', component: '@/pages/scroll' },
  ],
  fastRefresh: {},
});
