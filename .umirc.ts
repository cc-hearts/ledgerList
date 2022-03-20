import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/main', redirect: '/home' },
    { path: '/home', component: '@/index' },
    { path: '/canvas', component: '@/pages/canvas' },
    { path: '/scroll', component: '@/pages/scroll' },
    { path: '/scrollUi', component: '@/pages/scroll/scroll.tsx' },
    { path: '/todo', component: '@/pages/todoList' },
    { path: '/loading', component: '@/pages/loading' },
    { path: '/animation', component: '@/pages/animation' },
    { path: '/card', component: '@/pages/card' },
    { path: '/code', component: '@/pages/code' },
    { path: '*', component: '@/pages/404' },
  ],
  fastRefresh: {},
  extraPostCSSPlugins: [require('autoprefixer'), require('tailwindcss')],
});
