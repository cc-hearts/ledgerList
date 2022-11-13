/**
 * @author cc-heart
 * @description 子页面布局
 * @Date 2022-11-13
 */
import React from 'react';
import TopBar from './topBar';
interface route {
  title: string;
  path: string;
  routes?: Array<route>;
}
export default (props: { route: route; location: { pathname: string }; children: React.ReactNode }) => {
  const { location, children, route } = props;
  const { pathname } = location;
  const queue = [];
  if (route.routes && route.routes.length > 0) {
    queue.push(...route.routes);
  }
  let title = route.title;
  while (pathname !== title && queue.length > 0) {
    const list = queue.slice();
    queue.length = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].path === pathname) {
        title = list[i].title;
        break;
      }
      const r = list[i].routes;
      if (r) {
        queue.push(...r);
      }
    }
    break;
  }
  return (
    <>
      <TopBar title={title} />
      {children}
    </>
  );
};
